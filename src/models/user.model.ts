import mongoose, { Schema } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
  passwordChangedAt?: Date; // 👈 add this
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    address: { type: String, required: false },
    passwordChangedAt: { type: Date, required: false },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
