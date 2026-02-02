import { auth } from '#/auth';

const TEST_USER = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123',
};

async function seed() {
  console.log('seeding database...');

  try {
    await auth.api.signUpEmail({
      body: TEST_USER,
    });
    console.log(`created user: ${TEST_USER.email}`);
  } catch (error) {
    if (error instanceof Error && error.message.includes('already exists')) {
      console.log(`user ${TEST_USER.email} already exists, skipping`);
    } else {
      throw error;
    }
  }

  console.log('seed complete');
  process.exit(0);
}

seed().catch((error) => {
  console.error('seed failed:', error);
  process.exit(1);
});
