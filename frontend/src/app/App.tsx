import { ErrorBoundary } from "@entities/common";
import { useAuthToken } from "@shared/lib/hooks/useAuthToken.hook"
import { memo, useEffect } from "react"
import { useDispatch } from "react-redux";

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
      <div>...App</div >
    </ErrorBoundary>
  )
}

export default memo(App)