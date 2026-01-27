export interface Action {
  id: string;
  name: string;
}

export interface RoleAction {
  id: string;
  roleId: string;
  actionId: string;
}
