
import { Router } from 'express';
import { validateBody } from '../middleware/zodMiddleware';
import { registerSchema, loginSchema } from '../schemas/auth.schema';
import { register, login } from '../services/auth.service';
import { verifyRefreshToken } from '../config/jwt';
import { env } from '../config/env';
import { User } from '../model/user';
import { signAccessToken } from '../config/jwt';

export const authRouter = Router();

// Register
authRouter.post('/register', validateBody(registerSchema), async (req, res) => {
  try {
    const { user, accessToken, refreshToken } = await register(req.body);
    res
      .cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: env.COOKIE_SECURE,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        domain: env.COOKIE_DOMAIN,
        path: '/api/auth',
      })
      .status(201)
      .json({
        accessToken,
        user: { id: user.id, name: user.name, username: user.username, email: user.email, role: user.role },
      });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Login
authRouter.post('/login', validateBody(loginSchema), async (req, res) => {
  try {
    const { user, accessToken, refreshToken } = await login(req.body.usernameOrEmail, req.body.password);
    res
      .cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: env.COOKIE_SECURE,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        domain: env.COOKIE_DOMAIN,
        path: '/api/auth',
      })
      .json({
        accessToken,
        user: { id: user.id, name: user.name, username: user.username, email: user.email, role: user.role },
      });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
});

// Refresh access token (silent refresh)
authRouter.post('/refresh', async (req, res) => {
  const token = req.cookies?.refresh_token;
  if (!token) return res.status(401).json({ error: 'Missing refresh token' });

  try {
    const payload = verifyRefreshToken(token);
    const user = await User.findById(payload.sub);
    if (!user || !user.isActive) return res.status(401).json({ error: 'Invalid user' });

    const newAccess = signAccessToken({ sub: user.id, role: user.role });
    res.json({ accessToken: newAccess });
  } catch {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
});

// Logout (clear refresh cookie)
authRouter.get('/logout', (req, res) => {
  res.clearCookie('refresh_token', {
    httpOnly: true,
    secure: env.COOKIE_SECURE,
    sameSite: 'strict',
    domain: env.COOKIE_DOMAIN,
    path: '/',
  });
  res.status(200).json({ message: 'Logged out' });
});

authRouter.get("/users",  async (req, res) => {
  try {
    const users = await User.find({}, "id name username email role isActive createdAt");

    res.json({
      count: users.length,
      users,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});
