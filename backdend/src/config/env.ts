import dotenv from "dotenv"
dotenv.config()
export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT || 4000),
  MONGODB_URI: process.env.MONGODB_URI !,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,   // 256-bit secret
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!, // 256-bit secret
  ACCESS_TOKEN_EXPIRES_IN: '15m',
  REFRESH_TOKEN_EXPIRES_IN: '7d',
  COOKIE_SECURE: process.env.NODE_ENV === 'production',
  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN, // optional
};
