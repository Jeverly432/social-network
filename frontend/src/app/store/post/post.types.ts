
import type { ICommunityState } from "../community/community.types";
import type { IUserState } from "../user/user.types";

type PostType = 'user' | 'community'

export interface IPostState {
  content: string,
  images: string[],
  author: IUserState,
  community: ICommunityState,
  likes: IUserState[],
  likesCount: number,
  commentsCount: number,
  type: PostType,
}