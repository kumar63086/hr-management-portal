
import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(3).max(50),
  username: z.string().min(3).max(20),
  email: z.string().max(100).email(),
  password: z.string().min(8).max(128),
  role: z.enum(['Admin', 'Editor', 'Viewer']),
});

export const loginSchema = z.object({
  usernameOrEmail: z.string().min(3).max(100),
  password: z.string().min(8).max(128),
});
