import { ErrorBoundary } from "@entities/common";
import { useAuthToken } from "@shared/lib/hooks/useAuthToken.hook"
import { memo, Suspense, useEffect } from "react"
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

const App = () => {
  const { token } = useAuthToken()
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch({ type: 'CHECK_AUTH', payload: token });
    }
  })

  return (
    <ErrorBoundary>
      <Suspense fallback={<></>}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  )
}

export default memo(App)