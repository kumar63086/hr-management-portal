
import mongoose, { Schema, Document } from 'mongoose';

export interface IEmployee extends Document {
  name: string;
  username: string;
  email: string;
  phone?: string;
  website?: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  isActive: boolean;
  skills: string[];
  availableSlots: string[]; // ISO future dates
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const EmployeeSchema = new Schema<IEmployee>(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    username: { type: String, required: true, unique: true, minlength: 3, maxlength: 20 },
    email: { type: String, required: true, unique: true, maxlength: 100, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    phone: { type: String, maxlength: 20 },
    website: { type: String, maxlength: 100 },
    role: { type: String, enum: ['Admin', 'Editor', 'Viewer'], required: true },
    isActive: { type: Boolean, default: true },
    skills: { type: [String], validate: [(v: string[]) => Array.isArray(v), 'Skills must be an array'] },
    availableSlots: { type: [String], default: [] },
    address: {
      street: { type: String, required: true, minlength: 2, maxlength: 50 },
      city: { type: String, required: true, minlength: 2, maxlength: 50 },
      zipcode: { type: String, required: true, match: /^\d{5,10}$/ },
    },
    company: {
      name: { type: String, required: true, minlength: 2, maxlength: 100 },
    },
  },
  { timestamps: true }
);

export const Employee = mongoose.model<IEmployee>('Employee', EmployeeSchema);
