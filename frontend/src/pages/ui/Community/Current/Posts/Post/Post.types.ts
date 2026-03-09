import type { IPostState } from "@app/store/post/post.types"

export interface IPost {
  post: IPostState
  setSelectedPost: React.Dispatch<React.SetStateAction<string>>
  userName?: string
}
