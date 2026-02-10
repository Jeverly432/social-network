import { memo } from "react"
import styles from "./Home.module.scss"
import { Stories } from "@entities/common"

const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <Stories />
    </div>
  )
}

export default memo(HomePage)