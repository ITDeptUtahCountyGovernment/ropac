import { UserProfileCard } from "./user-profile";

export default async function User({ params }: { params: Promise<{ id: string }>}) {
  const { id } = await params;
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <UserProfileCard userId={id}/> 
    </div>
  );
}
