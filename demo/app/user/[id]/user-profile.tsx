'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { View } from "@/lib/models"
import usePermissions from "@/lib/use-permissions"
import { Action } from "@/types/action"
import { FetchUserProfileArgs, Role, UserProfile } from "@/types/user"
import { useState } from "react"

const VIEWERS = [
  { id: '1', name: 'Alice (Admin)', roles: ['admin', 'employee'] },
  { id: '2', name: 'Bob (Team Lead)', roles: ['team_lead', 'employee'] },
  { id: '3', name: 'Carol (Public)', roles: ['public'] },
  { id: '4', name: 'Dan (Team Lead)', roles: ['team_lead', 'employee'] },
  { id: 'anonymous', name: 'Anonymous (No Account)', roles: ['public'] },
];

interface UserProfileCardProps {
  view: View<UserProfile, FetchUserProfileArgs, Action, Role>,
  userId: string;
}

interface FieldDisplayProps {
  label: string;
  field: { value: unknown; canRead: boolean; canUpdate: boolean } | undefined;
  editMode: boolean;
  type?: string;
}

function FieldDisplay({ label, field, editMode, type = "text" }: FieldDisplayProps) {
  if (!field) {
    return (
      <div className="grid gap-2">
        <Label className="text-muted-foreground">{label}</Label>
        <span className="text-sm text-muted-foreground italic">Field unavailable</span>
      </div>
    );
  }

  if (!field.canRead) {
    return (
      <div className="grid gap-2">
        <Label className="text-muted-foreground">{label}</Label>
        <span className="text-sm text-muted-foreground italic">No read permission</span>
      </div>
    );
  }

  const isReadOnly = !editMode || !field.canUpdate;

  return (
    <div className="grid gap-2">
      <Label>
        {label}
        {field.canUpdate && <Badge variant="outline" className="ml-2 text-xs">editable</Badge>}
      </Label>
      <Input
        type={type}
        value={String(field.value ?? '')}
        onChange={() => {}}
        readOnly={isReadOnly}
      />
    </div>
  );
}

export function UserProfileCard({ view, userId }: UserProfileCardProps) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [viewerId, setViewerId] = useState<string>('1');

  const { fields, actions, isLoading } = usePermissions<UserProfile, FetchUserProfileArgs, Action, Role>({
    view,
    args: { userId, viewerId }
  });

  const currentViewer = VIEWERS.find(v => v.id === viewerId);
  const hasEditAction = actions.some(a => a.name === 'EDIT_USER');

  function toggleEditMode() {
    setEditMode(!editMode);
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Viewer Settings</CardTitle>
          <CardDescription>Switch viewers to see different permission levels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Viewing As</Label>
            <Select value={viewerId} onValueChange={setViewerId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {VIEWERS.map(v => (
                  <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Roles</Label>
            <div className="flex gap-2 flex-wrap">
              {currentViewer?.roles.map(role => (
                <Badge key={role} variant="secondary">{role}</Badge>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Available Actions</Label>
            <div className="flex gap-2 flex-wrap">
              {actions.length > 0 ? (
                actions.map(a => (
                  <Badge key={a.id} variant="outline">{a.name}</Badge>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">No actions available</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {isLoading || !fields ? (
        <Card>
          <CardHeader>
            <CardTitle>User Profile: {userId}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="grid gap-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>User Profile: {userId}</CardTitle>
            <CardAction>
              {hasEditAction && !editMode && (
                <Button variant="default" onClick={toggleEditMode}>Edit</Button>
              )}
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Basic Info</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FieldDisplay label="ID" field={fields.id} editMode={editMode} />
                  <FieldDisplay label="Name" field={fields.name} editMode={editMode} />
                  <FieldDisplay label="Email" field={fields.email} editMode={editMode} type="email" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Address</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FieldDisplay label="Street" field={fields.address?.street} editMode={editMode} />
                  <FieldDisplay label="City" field={fields.address?.city} editMode={editMode} />
                  <FieldDisplay label="Country" field={fields.address?.country} editMode={editMode} />
                  <FieldDisplay label="Latitude" field={fields.address?.coordinates?.lat} editMode={editMode} />
                  <FieldDisplay label="Longitude" field={fields.address?.coordinates?.lng} editMode={editMode} />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Preferences</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FieldDisplay label="Theme" field={fields.preferences?.theme} editMode={editMode} />
                  <FieldDisplay label="Email Notifications" field={fields.preferences?.notifications?.email} editMode={editMode} />
                  <FieldDisplay label="SMS Notifications" field={fields.preferences?.notifications?.sms} editMode={editMode} />
                  <FieldDisplay label="Push Enabled" field={fields.preferences?.notifications?.push?.enabled} editMode={editMode} />
                  <FieldDisplay label="Push Frequency" field={fields.preferences?.notifications?.push?.frequency} editMode={editMode} />
                </div>
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
      )}
    </div>
  )
}
