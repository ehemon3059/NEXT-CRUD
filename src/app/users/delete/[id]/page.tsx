"use client";
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { deleteUser } from "../../../actions"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react";

type DeleteUserButtonProps = {
  user: { id: string }
}

export default function DeleteUserButton({ user }: DeleteUserButtonProps) {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      className="flex items-center gap-2 text-red-600"
      onClick={async () => {
        if (!confirm("Are you sure you want to delete this user?")) return

        try {
          const result = await deleteUser(user.id)
          if (result.success) {
            toast.success("User deleted successfully")
            router.refresh() // refresh page to update table
          }
        } catch (error: any) {
          toast.error(error.message || "Failed to delete user")
        }
      }}
    >
      <Trash2 className="h-4 w-4" /> Delete
    </Button>
  )
}
