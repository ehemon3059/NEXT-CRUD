// schemas/user.ts
import { z } from 'zod';

// Define the shape and validation rules for the form data
export const UserSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }).max(50, {
    message: "Name cannot be more than 50 characters."
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
});

export type UserSchemaType = z.infer<typeof UserSchema>;