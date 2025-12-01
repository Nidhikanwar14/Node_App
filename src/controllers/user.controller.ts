import { Request, Response } from 'express';
import * as userService from '../services/user.service';

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err?.message || 'Failed to create user' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json({ data: users, success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Failed to fetch user' });
  }
};

export const deleteUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.deleteAllUsers();
    res.json({ message: 'All users deleted', result });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Failed to delete users' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await userService.authenticateUser(email, password);

    res.cookie('access_token', result.token, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      path: '/',
      maxAge: 15 * 60 * 1000,
    });
    res.json({
      user: result.user,
      message: 'Logged in successfully!',
      success: true,
    });
  } catch (err: any) {
    res.status(500).json({ message: 'Authentication failed', success: false });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const result = await userService.forgotPasswordService(email);
    res.json({
      reset_link: result,
      message: 'Reset Password link generated successfully',
    });
  } catch (err: any) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;
    const user = await userService.resetPasswordService(password, token);
    res.json({ user, message: 'Password updated successfully' });
  } catch (err: any) {
    res.status(500).json({ message: 'Invalid or expired token' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedUser = await userService.updateUser(id, req.body);
    res.json({ data: updatedUser, message: 'User updated successfully' });
  } catch (err: any) {
    res.status(500).json({ message: 'Failed to update user' });
  }
};

export const authenticateMe = async (req: Request, res: Response) => {
  res.json({
    data: {
      authenticated: true,
    },
    success: true,
  });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('access_token', {
    httpOnly: true,
    secure: false, // SAME as when cookie was set
    sameSite: 'lax', // SAME as when cookie was set
    path: '/', // SAME as when cookie was set
  });
  res.json({ message: 'Logged out successfully', success: true });
};
