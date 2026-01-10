import type { ICommunityState } from "@app/store/community/community.types";

export interface ICommunityProps {
  items: ICommunityState[] | []
  isLoading: boolean
  activeSlug: string
}