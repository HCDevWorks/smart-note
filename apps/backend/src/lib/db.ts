/* eslint-disable */
// Doing eslint-disable because of the global variable prisma
import { PrismaClient } from '@prisma/client/extension';

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma;
}
