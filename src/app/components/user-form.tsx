// components/user-form.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserSchema, UserSchemaType } from '../schemas/user';
import { createUser } from '../../app/actions';

// Import shadcn/ui components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Link from 'next/link';

export function UserForm() {
  const form = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  async function onSubmit(values: UserSchemaType) {
    // The server action is called here.
    const result = await createUser(values);

    if (result.success) {
      toast.success(result.message);
      form.reset(); // Clear form on success
    } else {
      toast.error(result.message || 'An unknown error occurred.');
      // You could also map server-side errors back to form fields here if needed.
    }
  }

  return (
    <div className="w-full max-w-sm p-6 bg-white shadow-xl rounded-lg border">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New User</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="John Doe" 
                    className="focus-visible:ring-indigo-500" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="john@example.com" 
                    type="email" 
                    className="focus-visible:ring-indigo-500" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700" 
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Creating...' : 'Create User'}
          </Button>
        </form>
      </Form>
      <Link href="/users" className="text-sm text-indigo-600 hover:underline mt-4 inline-block">
        View All Users
      </Link>
    </div>
  );
}