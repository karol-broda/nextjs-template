import { z } from 'zod';

export const passwordSchema = z.string().min(8, {
  message: 'The Password must be at least 8 characters long',
});

export const emailSchema = z
  .string()
  .email({ message: 'The email is not valid' });

export const firstNameSchema = z
  .string()
  .min(1, { message: 'Name is required' });
export const lastNameSchema = z
  .string()
  .min(1, { message: 'Surname is required' });
export const nicknameSchema = z.string().nullable();

export const credentialsSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
