import { users } from '@/data/users';
import { Model } from '@/lib/models'
import { Action } from '@/types/action'
import { FetchUserProfileArgs, UserProfile } from '@/types/user'
const userModel: Model<UserProfile, FetchUserProfileArgs, Action, RoleAction> = {
  endpoints: {
    get: {},
    patch: {},
  },

  async getData(modelArgs, ...args) {
   const user = users.find(u => u.id === modelArgs?.userId);
  },
}
