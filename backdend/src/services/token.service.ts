
import { signAccessToken, signRefreshToken } from '../config/jwt';

export const issueTokens = (userId: string, role: 'Admin' | 'Editor' | 'Viewer') => {
  const payload = { sub: userId, role };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);
  return { accessToken, refreshToken };
};
