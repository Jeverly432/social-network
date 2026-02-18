import type { RootState } from "@app/store/root.types"
import styles from "./Posts.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { formatTimeAgo } from "@shared/lib"
import { Icons } from "@shared/assets"
import { ActionButton, Dropdown } from "@shared/ui"
import { deletePostAction } from "@middleware/post/post.saga"
import { PostSkeleton } from "./Skeleton/PostSkeleton.component"
import { useEffect } from "react"

export const Posts = () => {
  const dispatch = useDispatch()
  const posts = useSelector((state: RootState) => state.community.posts)
  const user = useSelector((state: RootState) => state.user.user)
  const isLoading = true

  const handlePostDelete = (id: string | null) => {
    if (id) {
      console.log(id)
      dispatch(deletePostAction({ id: id }))
    }
  }
  useEffect(()=>{
    console.log(isLoading)
  },[isLoading])
  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        {[...Array(3)].map((_, index) => (
          <PostSkeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      {posts.map((post) => (
        <li key={post._id || Math.random()} className={styles.item}>
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
            <Dropdown
              size="m"
              variant="primary"
              trigger={['click']}
              placement="bottomCenter"
              arrow
              menu={{
                items: [
                  {
                    key: '1',
                    label: 'Edit',
                  },
                  {
                    key: '2',
                    label: 'Delete',
                    onClick: () => handlePostDelete(post._id)
                  },
                ],
              }}
            >
              <ActionButton variant="inverse" size="s" className={styles.settings}>
                <Icons.Community.Current.Create />
              </ActionButton>
            </Dropdown>
          </div>
          <div className={styles.content}>
            <h2 className={styles.title}>
              {post.title}
            </h2>
            <p className={styles.description}>
              {post.description}
            </p>
          </div>
          {post.images.length > 0 && (
            <ul className={styles.gallery}>
              {post.images.map((image) => (
                <li key={image}>
                  <img src={image} alt={image} />
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </div>
  )
}
