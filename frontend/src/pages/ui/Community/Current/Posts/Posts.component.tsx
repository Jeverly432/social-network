import type { RootState } from "@app/store/root.types"
import styles from "./Posts.module.scss"
import { useSelector } from "react-redux"
import { PostSkeleton } from "./Skeleton/PostSkeleton.component"
import type { IPosts } from "./Posts.types"
import { Post } from "./Post/Post.component"
import { Fragment } from "react/jsx-runtime"

export const Posts = ({ setSelectedPost }: IPosts) => {
  const posts = useSelector((state: RootState) => state.community.posts)
  const isLoading = useSelector((state: RootState) => state.post.isLoading)

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
        <Fragment key={post._id}>
          <Post post={post} setSelectedPost={setSelectedPost} />
        </Fragment>
      ))}
    </div >
  )
}
