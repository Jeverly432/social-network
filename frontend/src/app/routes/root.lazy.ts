import { safeLazy } from "@shared/lib/helpers/safeLazy";

/* export const Profile = safeLazy */
export const Login = safeLazy(() => import('@pages/ui/Login/Login.component'))