
import type { ICommunityState } from '../community/community.types';
import type { IUserState } from '../user/user.types';

type PostType = 'user' | 'community'

export interface IPostState {
  title: string 
  description: string
  images: string[]
  author: IUserState 
  community: ICommunityState
  likes: string[] | []
  likesCount: number 
  updatedAt: string
  commentsCount: number 
  type: PostType 
  _id: string
}

export interface IPostInitialState extends IPostState {
  isLoading: boolean
  modalOpen: boolean
}
