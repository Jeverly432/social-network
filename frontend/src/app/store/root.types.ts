import type { ICommunityInitialState } from "./community/community.types"
import type { IUserInitialState } from "./user/user.types"

export type RootState = {
  user: IUserInitialState,
  community: ICommunityInitialState
}

