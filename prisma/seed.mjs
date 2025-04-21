import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create some sample users
  const user1 = await prisma.user.create({
    data: {
      email: 'john.doe@example.com',
      password: 'password123', // In a real app, you should hash passwords
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'jane.doe@example.com',
      password: 'password123',
    },
  });

  // Create some tasks for user1
  await prisma.task.create({
    data: {
      title: 'Buy groceries',
      status: 'PENDING',
      userId: user1.id,
    },
  });

  await prisma.task.create({
    data: {
      title: 'Finish project',
      status: 'PENDING',
      userId: user1.id,
    },
  });

  // Create some tasks for user2
  await prisma.task.create({
    data: {
      title: 'Complete homework',
      status: 'PENDING',
      userId: user2.id,
    },
  });

  await prisma.task.create({
    data: {
      title: 'Prepare dinner',
      status: 'PENDING',
      userId: user2.id,
    },
  });

  console.log('Seeding completed!');
}

async function handle() {
  try {
    await main(); // Call the main function to perform the seeding
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect(); // Ensure Prisma disconnects
  }
}

handle(); // Start the seed script
