import { memo } from "react"
import styles from "./Home.module.scss"
import { Post, Stories } from "@entities/common"
import { Empty } from "./Empty/Empty.component"

const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <Stories />
      <Post step={0} communityId={null} postId={null} />
      <Empty />
    </div>
  )
}

export default memo(HomePage)