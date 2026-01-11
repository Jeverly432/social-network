import { memo } from "react"
import styles from "./Community.module.scss"
import { useNavigate } from "react-router-dom"
import { Icons } from "@shared/assets"

const Community = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)

  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <button onClick={handleBack}>
          <Icons.UI.Arrow />
        </button>
        <h2 className={styles.title}>

        </h2>
      </div>
      <div className={styles.body}>

      </div>
    </div>
  )
}

export default memo(Community)