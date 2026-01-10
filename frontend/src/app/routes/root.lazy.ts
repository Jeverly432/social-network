import { safeLazy } from "@shared/lib/helpers/safeLazy";

/* export const Profile = safeLazy */
export const HomePage = safeLazy(() => import('@pages/ui/Home/Home.component'))
export const ExplorePage = safeLazy(() => import('@pages/ui/Explore/Explore.component'))
export const CommunityPage = safeLazy(() => import('@pages/ui/Community/Community.component'))