import { AuthModal, ErrorBoundary, Notification } from "@entities/common";
import { getUserAction } from "@middleware/user/user.saga";
import { Layout } from "@shared/ui";
import { memo, Suspense, useEffect } from "react"
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { setIsOpen } from "./store/auth/auth.slice";
import { Cookies } from "react-cookie";

const App = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const token = cookies.get('token');

  useEffect(() => {
    if (token) {
      dispatch(getUserAction());
    } else {
      dispatch(setIsOpen(true))
    }
  }, [token])

  return (
    <ErrorBoundary>
      <Layout>
        <Suspense fallback={<></>}>
          <Outlet />
        </Suspense>
      </Layout>
      <AuthModal />
      <Notification />
    </ErrorBoundary>
  )
}

export default memo(App)