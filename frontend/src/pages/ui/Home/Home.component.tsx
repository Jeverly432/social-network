import { memo } from "react"
import styles from "./Home.module.scss"
import { Post, Stories } from "@entities/common"
import { Empty } from "./Empty/Empty.component"

const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <Stories />
      <Post />
      <Empty />
    </div>
  )
}

export default memo(HomePage)