
import mongoose, { Schema, Document } from 'mongoose';

export type Role = 'Admin' | 'Editor' | 'Viewer';

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  passwordHash: string;
  role: Role;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    username: { type: String, required: true, unique: true, minlength: 3, maxlength: 20 },
    email: { type: String, required: true, unique: true, maxlength: 100 },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Editor', 'Viewer'], required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

UserSchema.methods.comparePassword = async function (candidate: string) {
  const bcrypt = await import('bcryptjs');
  return bcrypt.compare(candidate, this.passwordHash);
};

export const User = mongoose.model<IUser>('User', UserSchema);
