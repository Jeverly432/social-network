import type { ICommunityInitialState } from "./community/community.types"
import type { IAuthInitialState } from "./auth/auth.types"
import type { IUserInitialState } from "./user/user.types"
import type { INotificationInitialState } from "./notification/notification.types"

export type RootState = {
  user: IUserInitialState,
  community: ICommunityInitialState
  auth: IAuthInitialState
  notification: INotificationInitialState
}

