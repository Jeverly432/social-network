import type { IInputProps } from "@shared/ui/atoms"
import type { INavigationProps } from "@shared/ui/molecules"
import type { ICommunityItemProps } from "@shared/ui/molecules/Community/CommunityItem/CommunityItem.types"

export interface ISidebarProps {
  newNotifications: boolean
  title: string
  input: IInputProps
  navigation: INavigationProps
  communityData: ICommunityItemProps[]
}

