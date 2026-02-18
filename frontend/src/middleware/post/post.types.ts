import type { IPostState } from "@app/store/post/post.types"

export interface IPostPost {
  communityId: string | null,
  description: string,
  title: string,
  images: File[]
}

export interface IResponsePosts {
  total: number,
  posts: IPostState[]
}