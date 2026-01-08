import { safeLazy } from "@shared/lib/helpers/safeLazy";

/* export const Profile = safeLazy */
export const LoginPage = safeLazy(() => import('@pages/ui/Login/Login.component'))
export const CommunityPage = safeLazy(() => import('@pages/ui/Community/Community.component'))