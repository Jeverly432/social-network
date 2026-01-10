import type { ICommunityState } from "@app/store/community/community.types";

export interface ICommunityItemProps extends ICommunityState{
  activeSlug: string
}