// app/actions.ts
'use server'; // This directive is crucial: it marks the file for server-side execution

import prisma from './lib/prisma'; // Your singleton Prisma client
import { UserSchema, UserSchemaType } from './schemas/user';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client'; // Import Prisma types if needed for return type

// ------------------------------------------------------------------
// DATA INSERTION (Existing function)
// ------------------------------------------------------------------

// This function will be called directly by the form's 'action' prop or via React Hook Form
export async function createUser(data: UserSchemaType) {
  // 1. Server-side validation (Crucial for security and data integrity)
  const validation = UserSchema.safeParse(data);

  if (!validation.success) {
    // Return validation errors
    return {
      success: false,
      message: 'Validation failed.',
      errors: validation.error.flatten().fieldErrors,
    };
  }

  try {
    // 2. Insert data into PostgreSQL using Prisma
    await prisma.user.create({
      data: {
        name: validation.data.name,
        email: validation.data.email,
      },
    });

    // 3. Revalidate the path to update the list of users on the main page
    revalidatePath('/');

    return { success: true, message: 'User created successfully!' };

  } catch (error) {
    console.error(error);
    return { success: false, message: 'Database error: Could not create user.' };
  }
}

// ------------------------------------------------------------------
// DATA RETRIEVAL (New function for fetching all data)
// ------------------------------------------------------------------

// Assuming you have a 'User' model in your schema.prisma
// If you want a type-safe return, you can use Prisma.UserGetPayload<...>,
// but using the generated 'User' type is often simpler if you export it from your lib/prisma.ts

/**
 * Fetches all user records from the database.
 * @returns An array of user objects or an empty array on error.
 */
export async function getAllUsers() {
  try {
    // Use the findMany() method to retrieve all records from the 'user' model
    const users = await prisma.user.findMany({
      // You can add sorting, e.g., orderBy: { createdAt: 'desc' }
      orderBy: {
        id: 'asc', // Assuming 'id' is a field for ordering
      },
    });

    // Server Actions automatically handle serialization, so this array can be passed to a Client Component
    return users;

  } catch (error) {
    console.error('Error fetching users:', error);
    // Return an empty array or null to handle the error gracefully in the component
    return []; 
  }
}


// Edit User
export async function editUser(id: number, data: { name?: string; email?: string }) {
  try {
    if (data.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser && existingUser.id !== id) {
        return { success: false, message: "This email is already used by another user." };
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });

    return { success: true, user: updatedUser, message: "User updated successfully" };
  } catch (error: any) {
    console.error("Error editing user:", error);
    return { success: false, message: "Failed to update user" };
  }
}



// Get single user by ID
export async function getUserById(id: number) {
  try {
    return await prisma.user.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}



// Delete User
export async function deleteUser(id: number) {
  try {
    await prisma.user.delete({
      where: { id },
    });
    revalidatePath('/users'); // Revalidate the users page
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
}