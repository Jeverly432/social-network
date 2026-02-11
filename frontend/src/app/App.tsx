import { AuthModal, ErrorBoundary, Notification } from "@entities/common";
import { getUserAction } from "@middleware/user/user.saga";
import { Layout } from "@shared/ui";
import { memo, Suspense, useEffect } from "react"
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { setIsOpen } from "./store/auth/auth.slice";
import { showNotification } from "./store/notification/notification.slice";


const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      dispatch(getUserAction());
    } else {
      dispatch(setIsOpen(true))
    }
  }, [token])


  const handleShow = () => {
    dispatch(showNotification({ description: "dawdwa", title: "dawdwa", type: "error" }))
  }

  return (
    <ErrorBoundary>
      <Layout>
        <button onClick={handleShow}>dwada</button>
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