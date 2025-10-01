// components/edit-user-form.tsx
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, UserSchemaType, UserWithId } from "../schemas/user"; // ✅ Import the new type
import { editUser } from "../actions"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import Link from "next/link";

// ✅ SOLUTION: Use the proper type
export function EditUserForm({ user }: { user: UserWithId }) {
  const router = useRouter();

  const form = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  async function onSubmit(values: UserSchemaType) {
    const result = await editUser(user.id, values); // ✅ user.id is now properly typed

    if (result.success) {
      toast.success(result.message);
      router.push("/users"); // ✅ Fixed: using router.push instead of redirect
      router.refresh();
    } else {
      toast.error(result.message);

      if (result.message.includes("email")) {
        form.setError("email", { type: "manual", message: result.message });
      }
    }
  }

  return (
    <div className="w-full max-w-sm p-6 bg-white shadow-xl rounded-lg border">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit User</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John Doe" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="john@example.com" />
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
            {form.formState.isSubmitting ? "Updating..." : "Update User"}
          </Button>
        </form>
      </Form>

      <Button asChild className="mt-5 mb-5">
        <Link href="/">Create User</Link>
      </Button>

      <Button className="ml-5">
        <Link href="/users">
          View All Users
        </Link>
      </Button>
    </div>
  );
}