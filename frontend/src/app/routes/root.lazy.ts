import { safeLazy } from "@shared/lib/helpers/safeLazy";

/* export const Profile = safeLazy */
export const CommunityPage = safeLazy(() => import('@pages/ui/Community/Community.component'))
export const Explore = safeLazy(() => import('@pages/ui/Explore/Explore.component'))