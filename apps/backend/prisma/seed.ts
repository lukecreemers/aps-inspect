import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.INIT_ADMIN_EMAIL;
  const adminPassword = process.env.INIT_ADMIN_PASSWORD;

  const clientEmail = 'client@example.com';
  const clientPassword = 'client1234';

  if (!adminEmail || !adminPassword) {
    throw new Error(
      'INIT_ADMIN_EMAIL and INIT_ADMIN_PASSWORD must be set in .env',
    );
  }

  const adminSalt = crypto.randomBytes(16).toString('hex');
  const adminHash = crypto
    .pbkdf2Sync(adminPassword, adminSalt, 10000, 64, 'sha512')
    .toString('hex');

  const clientSalt = crypto.randomBytes(16).toString('hex');
  const clientHash = crypto
    .pbkdf2Sync(clientPassword, clientSalt, 10000, 64, 'sha512')
    .toString('hex');

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordSalt: adminSalt,
      passwordHash: adminHash,
    },
    create: {
      email: adminEmail,
      firstName: 'Luke',
      lastName: 'Creemers',
      passwordSalt: adminSalt,
      passwordHash: adminHash,
      role: 'ADMIN',
    },
  });

  const client = await prisma.user.upsert({
    where: { email: clientEmail },
    update: {
      passwordSalt: clientSalt,
      passwordHash: clientHash,
    },
    create: {
      email: clientEmail,
      firstName: 'Client',
      lastName: 'Example',
      passwordSalt: clientSalt,
      passwordHash: clientHash,
      role: 'CLIENT',
    },
  });

  console.log('Admin created:', adminEmail);
  console.log('Client created:', clientEmail);
}

main().finally(() => prisma.$disconnect());
