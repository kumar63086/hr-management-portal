
import { z } from 'zod';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const urlRegex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-./?%&=]*)?$/;
const phoneRegex = /^[+()\-\s\d]{7,20}$/; 

export const RoleEnum = z.enum(['Admin', 'Editor', 'Viewer']);

export const employeeCreateSchema = z.object({
  name: z.string().min(3).max(50),
  username: z.string().min(3).max(20),
  email: z.string().max(100).regex(emailRegex, 'Invalid email'),
  phone: z.string().max(20).regex(phoneRegex, 'Invalid phone').optional(),
  website: z.string().max(100).regex(urlRegex, 'Invalid URL').optional(),
  role: RoleEnum,
  isActive: z.boolean(),
  skills: z.array(z.string().min(2).max(10)),
  availableSlots: z
    .array(
      z
        .string()
        .refine((s) => !Number.isNaN(Date.parse(s)), 'Must be ISO date string')
        .refine((s) => new Date(s).getTime() > Date.now(), 'Must be in the future')
    )
    .default([]),
  address: z.object({
    street: z.string().min(2).max(50),
    city: z.string().min(2).max(50),
    zipcode: z.string().regex(/^\d{5,10}$/, 'Zipcode must be 5–10 digits'),
  }),
  company: z.object({
    name: z.string().min(2).max(100),
  }),
});

export const employeeUpdateSchema = employeeCreateSchema.partial();

export type EmployeeCreateInput = z.infer<typeof employeeCreateSchema>;
export type EmployeeUpdateInput = z.infer<typeof employeeUpdateSchema>;
