export interface IPost {
  step: number
  communityId: string | null
  postId: string | null
  onModalClose?: () => void
}