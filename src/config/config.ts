import dotenv from 'dotenv';

dotenv.config();

export const config = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: '1h' as const,
};
