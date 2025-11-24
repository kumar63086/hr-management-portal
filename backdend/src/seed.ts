import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from './model/user';
import { env } from './config/env';

const seedUsers = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing users (optional)
    await User.deleteMany({});

    const users = [
      {
        name: 'Admin User',
        username: 'admin',
        email: 'admin@example.com',
        password: 'Admin@123',
        role: 'Admin' as const,
      },
      {
        name: 'Editor User',
        username: 'editor',
        email: 'editor@example.com',
        password: 'Editor@123',
        role: 'Editor' as const,
      },
      {
        name: 'Viewer User',
        username: 'viewer',
        email: 'viewer@example.com',
        password: 'Viewer@12',
        role: 'Viewer' as const,
      },
    ];

    for (const u of users) {
      const passwordHash = await bcrypt.hash(u.password, 12);
      await User.create({
        name: u.name,
        username: u.username,
        email: u.email,
        passwordHash,
        role: u.role,
        isActive: true,
      });
      console.log(`Seeded user: ${u.email} (${u.role})`);
    }

    console.log('Seeding complete');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedUsers();
