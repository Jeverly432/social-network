import { Sidebar as SidebarComponent } from "@shared/ui"
import { Search } from "@shared/assets"
import { useLocation } from "react-router-dom"
import { communityData, data } from "./Sidebar.data"

export const Sidebar = () => {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <SidebarComponent
      title="Community"
      newNotifications={true}
      input={{ placeholder: "Search community and user", prefix: <Search />, size: "s" }}
      navigation={{ items: data, activeRoute: pathname }}
      communityData={communityData}
      isCommunityLoading={false}
    />
  )
}