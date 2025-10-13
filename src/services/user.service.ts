import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config/config';

export const createUser = async (data: {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
}) => {
  // hash password before saving
  const hashPassword = await bcrypt.hash(data.password, 10);
  return await User.create({ ...data, password: hashPassword });
};

export const getAllUsers = async () => {
  return await User.find();
};

export const deleteAllUsers = async () => {
  return await User.deleteMany();
};

export const authenticateUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error('User not found');

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) throw new Error('Invalid password');

  // create token

  if (!config.jwtSecret) {
    throw new Error('JWT secret is not defined');
  }
  // create JWT
  const token = jwt.sign(
    { id: user._id, email: user.email },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );
  return { token, user };
};

export const generateResetToken = async (email: string) => {
  const userId = await User.findOne({ email }).select('_id');

  const secret = config.jwtSecret;
  if (!secret) {
    throw new Error('JWT secret is not defined');
  }
  // reset Password token
  const token = jwt.sign({ id: userId }, secret, { expiresIn: '1h' });
  return token;
};

export const forgotPasswordService = async (email: string) => {
  const token = await generateResetToken(email);
  return `myapp://reset-password/${token}`;
};

export const resetPasswordService = async (password: string, token: any) => {
  interface ResetPayload extends JwtPayload {
    _id: string;
  }
  const secret = config.jwtSecret;
  if (!secret) {
    throw new Error('JWT secret is not defined');
  }
  const payload = jwt.verify(token, secret) as ResetPayload;
  if (!payload.id) {
    throw new Error('Invalid token payload');
  }
  const user = await User.findById(payload.id._id);

  if (!user) {
    throw new Error('User is not valid');
  }

  user.password = await bcrypt.hash(password, 10);
  return user.save();
};

export const updateUser = async (id: string, data: any) => {
  const isPassword = !!data.password;
  let updatedData = { ...data };

  if (isPassword) {
    const hashPassword = await bcrypt.hash(data.password, 10);
    updatedData = {
      ...data,
      password: hashPassword,
      passwordChangedAt: new Date(), // mark password change
    };
  }

  const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  return updatedUser;
};
