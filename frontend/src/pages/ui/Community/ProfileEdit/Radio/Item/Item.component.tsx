import type { ReactNode } from "react"
import styles from "./Item.module.scss"

interface IItemProps {
  title: string
  description: string
  icon: ReactNode
}

export const Item = ({ description, icon, title }: IItemProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        {icon}
      </div>
      <div className={styles.body}>
        <h4 className={styles.title}>
          {title}
        </h4>
        <p className={styles.description}>
          {description}
        </p>
      </div>
    </div>
  )
}