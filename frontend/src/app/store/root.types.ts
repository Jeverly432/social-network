import type { ICommunityInitialState } from "./community/community.types"
import type { ILoginInitialState } from "./login/login.types"
import type { IUserInitialState } from "./user/user.types"

export type RootState = {
  user: IUserInitialState,
  community: ICommunityInitialState
  login: ILoginInitialState
}

