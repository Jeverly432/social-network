import { useSelector } from "react-redux"
import styles from "./Post.module.scss"
import type { RootState } from "@app/store/root.types"
import { Link } from "react-router-dom"
import { ActionButton, Input } from "@shared/ui"
import { Icons } from "@shared/assets"

export const Post = () => {
  const user = useSelector((state: RootState) => state.user.user)

  return (
    <div className={styles.wrapper}>
      <Link to={`/${user?.userName}`} className={styles.user}>
        <img src={user?.avatar} alt={user?.userName} />
      </Link>
      <Input placeholder="What's going on?" variant="rounded" className={styles.input} size="s" />
      <ActionButton size="m" variant="secondary">
        <Icons.Community.Current.ImageIcon />
      </ActionButton>
      <ActionButton size="m" variant="secondary">
        <Icons.Community.Current.Play />
      </ActionButton>
      <ActionButton size="m" variant="secondary">
        <Icons.Community.Current.Pin />
      </ActionButton>
      <ActionButton size="m" variant="secondary">
        <Icons.Community.Current.Chart />
      </ActionButton>
      <ActionButton size="m" variant="secondary">
        <Icons.Community.Current.New />
      </ActionButton>
    </div>
  )
}