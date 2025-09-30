// app/user/edit/[id]/page.tsx
import { getUserById } from "../../../actions";
import { EditUserForm } from "../../../components/edit-user-form";

export default async function EditUserPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // Await the params before accessing its properties
  const { id } = await params;
  const user = await getUserById(Number(id));

  if (!user) {
    return <p className="p-6 text-red-600">User not found.</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <EditUserForm user={user} />
    </div>
  );
}