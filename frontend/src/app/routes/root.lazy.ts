import { safeLazy } from "@shared/lib/helpers/safeLazy";

/* export const Profile = safeLazy */
export const HomePage = safeLazy(() => import('@pages/ui/Home/Home.component'))
export const ExplorePage = safeLazy(() => import('@pages/ui/Explore/Explore.component'))
export const CommunityPage = safeLazy(() => import('@pages/ui/Community/Current/Community.component'))
export const CommunityCreatePage = safeLazy(() => import('@pages/ui/Community/Create/Community.component'))
export const CommunitySettings = safeLazy(() => import('@pages/ui/Community/Settings/Community.component'))
export const CommunityProfileEdit = safeLazy(() => import('@pages/ui/Community/ProfileEdit/Community.component'))
export const CommunityPostPermissions = safeLazy(()=> import('@pages/ui/Community/PostPermissions/Community.component'))