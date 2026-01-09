import { memo, useEffect, useState } from "react"
import styles from "./Community.module.scss"
import { Stories } from "@entities/common"
import { useDispatch, useSelector } from "react-redux"
import { postLoginUserAction, getUserAction } from "@middleware/user/user.saga"
import type { RootReducer } from "@app/store/root.reducer"

const CommunityPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const token = useSelector((state: RootReducer) => state.user.token);
  const user = useSelector((state: RootReducer) => state.user.user);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(postLoginUserAction({
      email,
      password
    }));
  };

  useEffect(() => {
    console.log('Token from Redux:', token);
    console.log('User from Redux:', user);
  }, [token, user])

  return (
    <div className={styles.wrapper}>
      <Stories />
      {!token && (
        <form onSubmit={handleLogin}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <input value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  )
}

export default memo(CommunityPage)