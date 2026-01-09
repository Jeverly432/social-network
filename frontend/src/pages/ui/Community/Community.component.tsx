import { memo } from "react"
import styles from "./Community.module.scss"
import { Stories } from "@entities/common"

const CommunityPage = () => {
  return (
    <div className={styles.wrapper}>
      <Stories />
    </div>
  )
}

export default memo(CommunityPage)