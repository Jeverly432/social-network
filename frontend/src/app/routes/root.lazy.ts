import { safeLazy } from "@shared/lib/helpers/safeLazy";

/* export const Profile = safeLazy */
export const LoginPage = safeLazy(() => import('@pages/ui/Login/Login.component'))
export const HomePage = safeLazy(() => import('@pages/ui/Home/Home.component'))