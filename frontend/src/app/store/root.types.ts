import type { ICommunityInitialState } from "./community/community.types"
import type { IUserState } from "./user/user.types"

export type RootState = {
  user: IUserState,
  community: ICommunityInitialState
}

