import { Role } from "../types/role";
import { UserRole } from "../types/user-roles";

export const roles: Role[] = [
  { id: "r1", title: "Admin" },
  { id: "r2", title: "Editor" },
  { id: "r3", title: "Viewer" },
];

export const userRoles: UserRole[] = [
  { id: "ur1", userId: "1", roleId: "r1" },
  { id: "ur2", userId: "1", roleId: "r2" },
  { id: "ur3", userId: "2", roleId: "r3" },
  { id: "ur4", userId: "3", roleId: "r2" },
  { id: "ur5", userId: "3", roleId: "r3" },
  { id: "ur6", userId: "4", roleId: "r1" },
];
