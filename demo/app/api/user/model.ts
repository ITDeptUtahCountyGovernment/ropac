import { getActionsForRoles } from '../../../data/actions';
import { getUserRoles, users } from '../../../data/users';
import { applySingleRolePermissionsMap, Model } from '../../../lib/models'
import { Action } from '../../../types/action'
import { FetchUserProfileArgs, Role, UserProfile } from '../../../types/user'
import { getDefaultRolePermissions } from '../../../utils/get-default-role-permissions';

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

    getClientRoles(modelArgs?: FetchUserProfileArgs): Role[] {
        const viewerId = modelArgs?.viewerId ?? modelArgs?.userId;
        if (!viewerId) throw new Error("No viewerId or userId provided");
        try {
            return getUserRoles(viewerId);
        } catch {
            return ['public'];
        }
    },

    getActions(modelArgs?: FetchUserProfileArgs): Action[] {
        const roles = this.getClientRoles(modelArgs);
        return getActionsForRoles(roles);
    },
}

export { userModel }
