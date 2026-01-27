'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { users } from "@/data/users"
import { View } from "@/lib/models"
import usePermissions from "@/lib/use-permissions"
import { Action } from "@/types/action"
import { Role } from "@/types/role"
import { FetchUserProfileArgs, UserProfile } from "@/types/user"
import { useState } from "react"

interface UserProfileCardProps<UserProfile, FetchUserProfileArgs, Action, Role> {
  view: View<UserProfile, FetchUserProfileArgs, Action, Role>,
  userId: string;
}

export function UserProfileCard<UserProfile, FetchUserProfileArgs, Action, Role> ({ view, userId }: UserProfileCardProps<UserProfile, FetchUserProfileArgs, Action, Role>) {
  const [user, setUser] = useState<UserProfile>(users[0])
  const [canEdit, setCanEdit] = useState<boolean>(true);
  const [hasEditPermission, setHasEditPermission] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(false);

  const { data } = usePermissions<UserProfile, FetchUserProfileArgs, Action, Role>({ view, args: { userId }})

  function toggleEditMode() {
    setEditMode(!editMode);
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Viewing profile for user: {userId}</CardTitle>
        <CardAction>
          {hasEditPermission && !editMode && <Button variant="default" disabled={!canEdit} onClick={toggleEditMode}>Edit</Button>}
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={user.name.first}
              onChange={(e) => setUser({ ...user, name: { ...user.name, first: e.target.value } })}
              readOnly={!editMode}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={user.name.last}
              onChange={(e) => setUser({ ...user, name: { ...user.name, last: e.target.value } })}
              readOnly={!editMode}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              readOnly={!editMode}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              value={user.dob.toString()}
              onChange={(e) => setUser({ ...user, dob: new Date(e.target.value) })}
              readOnly={!editMode}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {editMode && (
          <Button type="button" className="w-full" onClick={toggleEditMode}>
            Save
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
