import { getActionsForRoles } from '../../../data/actions';
import { getUserRoles, users } from '../../../data/users';
import { applySingleRolePermissionsMap, Model } from '../../../lib/models'
import { Action } from '../../../types/action'
import { FetchUserProfileArgs, Role, UserProfile } from '../../../types/user'
import { getDefaultRolePermissions } from '../../../utils/get-default-role-permissions';
import { updatePermissionField } from '@/lib/models'
const userModel: Model<UserProfile, FetchUserProfileArgs, Action, Role> = {
    endpoints: {
        url: "/api/user",
        get: {},
        patch: {},
    },

    async getData(modelArgs) {
        const user = users.find(u => u.id === modelArgs?.userId);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    },

    async getPermissions(data) {
        const defaultPermissions = getDefaultRolePermissions();
        return applySingleRolePermissionsMap(data, defaultPermissions);
    },

    async applyPermissions(data, permissions, roles, modelArgs) {
      updatePermissionField(permissions, "name", "CRUD");
      return permissions;
    },

    getClientRoles(modelArgs?: FetchUserProfileArgs): Role[] {
        const userId = modelArgs?.userId;
        if (!userId) throw new Error("No userId provided");
        return getUserRoles(userId);
    },

    async getActions(modelArgs?: FetchUserProfileArgs): Promise<Action[]> {
        const roles = await this.getClientRoles(modelArgs);
        return getActionsForRoles(roles);
    },

    
}

export { userModel }
