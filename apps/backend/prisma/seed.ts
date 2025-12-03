import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.INIT_ADMIN_EMAIL;
  const password = process.env.INIT_ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'INIT_ADMIN_EMAIL and INIT_ADMIN_PASSWORD must be set in .env',
    );
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');

  const admin = await prisma.user.upsert({
    where: { email: email },
    update: {},
    create: {
      email: email,
      firstName: 'Luke',
      lastName: 'Creemers',
      passwordSalt: salt,
      passwordHash: hash,
      role: 'ADMIN',
    },
  });

  console.log('Admin created:', email);
}

main().finally(() => prisma.$disconnect());
