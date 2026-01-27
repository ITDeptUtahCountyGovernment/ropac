import { userModel } from "@/app/api/user/model";
import { UserProfileCard } from "./user-profile";
import { ModelInstance } from "@/lib/models";

export default async function User({ params }: { params: Promise<{ id: string }>}) {
  const { id } = await params;
  const view = new ModelInstance(userModel).createView();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <UserProfileCard view={view} userId={id}/> 
    </div>
  );
}
