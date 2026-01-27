import { NextRequest } from "next/server"
import { users } from "../../../data/users"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('userId');
  const user = users.find(u => u.id === id)
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  return Response.json(user);
}
