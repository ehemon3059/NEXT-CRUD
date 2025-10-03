// app/actions.ts
'use server';

import prisma from './lib/prisma';
import { UserSchema, UserSchemaType } from './schemas/user';
import { revalidatePath } from 'next/cache';
import { auth } from '../../auth'; // 👈 Import the auth function

// Helper function to enforce authentication
async function checkAuth() {
  const session = await auth();
  if (!session?.user) {
    throw new Error('Unauthorized access: User not authenticated.');
  }
  return session;
}

// ------------------------------------------------------------------
// DATA INSERTION (NOW PROTECTED)
// ------------------------------------------------------------------
export async function createUser(data: UserSchemaType) {
  await checkAuth(); // 👈 Enforce Auth Check

  // ... (rest of your existing createUser logic)
  const validation = UserSchema.safeParse(data);

  // ... (validation code)
  if (!validation.success) {
    return {
      success: false,
      message: 'Validation failed.',
      errors: validation.error.flatten().fieldErrors,
    };
  }

  try {
    // ✅ Check for duplicate email
    const existingUser = await prisma.user.findUnique({
      where: { email: validation.data.email },
    });

    if (existingUser) {
      return {
        success: false,
        message: 'Email already in use.',
        errors: { email: ['This email is already registered'] },
      };
    }

    await prisma.user.create({
      data: {
        name: validation.data.name,
        email: validation.data.email,
      },
    });

    // ✅ Revalidate both pages
    revalidatePath('/');
    revalidatePath('/users');

    return { success: true, message: 'User created successfully!' };

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Create user error:', error);
    }
    return { 
      success: false, 
      message: 'Failed to create user. Please try again.' 
    };
  }
}

// ------------------------------------------------------------------
// DATA RETRIEVAL (NOW PROTECTED)
// ------------------------------------------------------------------
export async function getAllUsers() {
  await checkAuth(); // 👈 Enforce Auth Check
  
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        id: 'asc',
      },
    });

    return users;

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching users:', error);
    }
    // ✅ Throw error so server component can catch it
    throw new Error('Failed to fetch users');
  }
}

// ------------------------------------------------------------------
// EDIT USER (NOW PROTECTED)
// ------------------------------------------------------------------
export async function editUser(id: number, data: { name?: string; email?: string }) {
  await checkAuth(); // 👈 Enforce Auth Check

  // ... (rest of your existing editUser logic)
  try {
    if (data.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser && existingUser.id !== id) {
        return { 
          success: false, 
          message: "This email is already used by another user." 
        };
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });

    // ✅ Revalidate both pages
    revalidatePath('/');
    revalidatePath('/users');
    revalidatePath(`/users/edit/${id}`);

    return { 
      success: true, 
      user: updatedUser, 
      message: "User updated successfully" 
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error("Error editing user:", error);
    }
    return { 
      success: false, 
      message: "Failed to update user. Please try again." 
    };
  }
}

// ------------------------------------------------------------------
// GET SINGLE USER (NOW PROTECTED)
// ------------------------------------------------------------------
export async function getUserById(id: number) {
  await checkAuth(); // 👈 Enforce Auth Check

  // ... (rest of your existing getUserById logic)
  try {
    return await prisma.user.findUnique({
      where: { id },
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error("Error fetching user:", error);
    }
    return null;
  }
}

// ------------------------------------------------------------------
// DELETE USER (NOW PROTECTED)
// ------------------------------------------------------------------
export async function deleteUser(id: number) {
  await checkAuth(); // 👈 Enforce Auth Check

  // ... (rest of your existing deleteUser logic)
  try {
    await prisma.user.delete({
      where: { id },
    });
    
    // ✅ Revalidate both pages
    revalidatePath('/');
    revalidatePath('/users');
    
    return { 
      success: true, 
      message: 'User deleted successfully' 
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error("Error deleting user:", error);
    }
    return { 
      success: false, 
      message: 'Failed to delete user. Please try again.' 
    };
  }
}