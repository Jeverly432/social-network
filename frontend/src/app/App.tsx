import { ErrorBoundary } from "@entities/common";
import { getUserAction } from "@middleware/user/user.saga";
import { Layout } from "@shared/ui";
import { memo, Suspense, useEffect } from "react"
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      dispatch(getUserAction());
    }
  }, [token])

  return (
    <ErrorBoundary>
      <Layout>
        <Suspense fallback={<></>}>
          <Outlet />
        </Suspense>
      </Layout>
    </ErrorBoundary>
  )
}

export default memo(App)