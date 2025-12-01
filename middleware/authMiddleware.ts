import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../src/config/config';
import User, { IUser } from '../src/models/user.model';
import { OAuth2Client } from 'google-auth-library';
import bcrypt from 'bcryptjs';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    let user: IUser | null = null;

    // Try verifying as Google ID token first
    // try {
    //   const ticket = await client.verifyIdToken({
    //     idToken: token,
    //     audience: process.env.GOOGLE_CLIENT_ID,
    //   });

    //   const payload = ticket.getPayload();
    //   const { email, name, picture } = payload as any;

    //   user = await User.findOne({ email });
    //   if (!user) {
    //     user = await User.create({
    //       email,
    //       firstName: name,
    //       password: await bcrypt.hash('Nidhi@123', 10),
    //       picture,
    //     });
    //   }

    //   (req as Request & { user?: IUser }).user = user;
    //   return next(); // ✅ Important!
    // } catch (googleError) {
    // Not a valid Google token — try as JWT
    const decoded: any = jwt.verify(token, config.jwtSecret as string);
    user = await User.findById(decoded.id);

    if (!user) return res.status(401).json({ message: 'User not found' });

    if (user.passwordChangedAt) {
      const passwordChangedAt = Math.floor(
        user.passwordChangedAt.getTime() / 1000
      );
      if (decoded.iat < passwordChangedAt) {
        return res.status(401).json({
          message: 'Password changed recently. Please log in again.',
        });
      }
    }

    (req as Request & { user?: IUser }).user = user;
    return next();
    // }
  } catch (err) {
    console.error('Authentication error', err);
    return res
      .status(401)
      .json({ message: 'Invalid token', authenticated: false });
  }
}
