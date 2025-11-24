// src/server.ts
import app from './app';
import { connectDb } from './db/mongoose';
import { env } from './config/env';

(async () => {
  await connectDb();
  app.listen(env.PORT, () => {
    console.log(`Server listening on port ${env.PORT}`);
  });
})();
