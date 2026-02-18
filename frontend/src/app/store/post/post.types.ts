
import type { ICommunityState } from '../community/community.types';
import type { IUserState } from '../user/user.types';

type PostType = 'user' | 'community'

export interface IPostState {
  title: string | null
  description: string | null
  images: string[] | []
  author: IUserState | null
  community: ICommunityState | null
  likes: IUserState[] | []
  likesCount: number | null
  updatedAt: string | null
  commentsCount: number | null
  type: PostType | null
  _id: string | null
}

export interface IPostInitialState extends IPostState {
  isLoading: boolean
}
