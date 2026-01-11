import { memo } from "react"
import styles from "./Community.module.scss"
import { useNavigate } from "react-router-dom"

const Community = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>

      </div>
      <div className={styles.body}>

      </div>
    </div>
  )
}

export default memo(Community)