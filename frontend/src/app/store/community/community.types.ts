import type { IPostState } from "../post/post.types"
import type { IUserState } from "../user/user.types"

export interface ICommunityState {
  name: string
  slug: string,
  description: string,
  avatar: string,
  coverImage: string,
  isPublic: boolean,
  creator: IUserState,
  admins: IUserState[],
  members: IUserState[],
  membersCount: number,
  posts: IPostState,
  verification: boolean
  tags: string[]
  postsCount: number,
}

export interface ICommunityInitialState {
  communities: {
    list: ICommunityState[] | []
    current: ICommunityState | null
  }
  isLoading: {
    list: boolean
    current: boolean
  }
  error: string | null
}