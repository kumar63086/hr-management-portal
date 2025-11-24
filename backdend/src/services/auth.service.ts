
import { User } from '../model/user';
import { issueTokens } from './token.service';
import bcrypt from 'bcryptjs';
import { asyncHandler } from "../utils/asyncErrorHandler";

export const register =asyncHandler( async (params: {
  name: string;
  username: string;
  email: string;
  password: string;
  role: 'Admin' | 'Editor' | 'Viewer';
}) => {
  const existing = await User.findOne({ $or: [{ email: params.email }, { username: params.username }] });
  if (existing) throw new Error('User already exists');

  const passwordHash = await bcrypt.hash(params.password, 12);

  const user = await User.create({
    name: params.name,
    username: params.username,
    email: params.email,
    passwordHash,
    role: params.role,
    isActive: true,
  });

  const { accessToken, refreshToken } = issueTokens(user.id, user.role);
  return { user, accessToken, refreshToken };
});

export const login = asyncHandler(async (usernameOrEmail: string, password: string) => {
  const user = await User.findOne({
    $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
  });
  if (!user) throw new Error('Invalid credentials');
  const ok = await user.comparePassword(password);
  if (!ok) throw new Error('Invalid credentials');
  if (!user.isActive) throw new Error('User is inactive');

  const { accessToken, refreshToken } = issueTokens(user.id, user.role);
  return { user, accessToken, refreshToken };
});
