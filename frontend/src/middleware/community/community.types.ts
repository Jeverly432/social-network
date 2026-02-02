import type { ICommunityState } from "@app/store/community/community.types"

export interface IResponseCommunities {
  communities: ICommunityState[]
}

export interface IPostUploadAvatar {
  file: File
  id: string
}

export interface IAvatarResponse {
  imageUrl: string
}

export interface IPostCreateCommunity {
  name: string
  description: string
  categories: string[]
  privacy: number
}

export interface IPostUpdateCommunity {
  name?: string
  description?: string
  categories?: string[]
  privacy?: number
}