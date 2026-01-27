import { Action, RoleAction } from '@/types/action'
import { Role } from '@/types/user'

export const actions: Action[] = [
  {
    id: "a1",
    name: "EDIT_USER"
  },
  {
    id: "a2",
    name: "CHANGE_USER_ROLE"
  }
]

export const roleActions: RoleAction[] = [
  { id: "ra1", roleId: "admin", actionId: "a1" },
  { id: "ra2", roleId: "admin", actionId: "a2" },
  { id: "ra3", roleId: "team_lead", actionId: "a1" },
]

export async function getActionsForRoles(roles: Role[]): Promise<Action[]> {
  const actionIds = roleActions
    .filter(ra => roles.includes(ra.roleId as Role))
    .map(ra => ra.actionId);
  const uniqueActionIds = [...new Set(actionIds)];
  return actions.filter(a => uniqueActionIds.includes(a.id));
}
