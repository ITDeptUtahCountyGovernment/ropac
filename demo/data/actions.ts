import { Action } from '@/types/action'

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
  {
      id: "ra1",
      roleId: "r1",
      actionId: "a1"
  },
  {
    id: "ra2",
    roleId: "r2",
    actionId: "a1",
  },
  {
    id: "ra3",
    roleId: "r1",
    actionId: "a2"
  }
]
