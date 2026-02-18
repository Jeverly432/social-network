import type { RootState } from "@app/store/root.types"
import styles from "./Posts.module.scss"
import { useSelector } from "react-redux"
import { formatTimeAgo } from "@shared/lib"
import { Icons } from "@shared/assets"
import { ActionButton } from "@shared/ui"

export const Posts = () => {
  const posts = useSelector((state: RootState) => state.community.posts)
  const user = useSelector((state: RootState) => state.user.user)

  return (
    <div className={styles.wrapper}>
      {posts.map((post) => (
        <li className={styles.item}>
          <div className={styles.headWrapper}>
            <div className={styles.imageWrapper}>
              {/* <img src={post.community?.coverImage} /> */}
            </div>
            <div className={styles.head}>
              <h3>
                {user?.userName}
              </h3>
              <div className={styles.nameWrapper}>
                <div className={styles.moderator}>
                  <Icons.Community.Current.Verification /> Moderator
                </div>
                <div className={styles.date}>
                  •
                  {post.updatedAt && formatTimeAgo(post.updatedAt)}
                </div>
              </div>
            </div>
            <ActionButton variant="inverse" size="s" className={styles.settings}>
              <Icons.Community.Current.Create />
            </ActionButton>
          </div>
        </li>
      ))}
    </div>
  )
}
