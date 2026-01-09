import { Link } from "react-router-dom"
import styles from "./Navigation.module.scss"
import type { INavigationProps } from "./Navigation.types"
import cn from "classnames"
import { isActive } from "./Navigation.data"

export const Navigation = ({ items, activeRoute }: INavigationProps) => {
  return (
    <div className={styles.wrapper}>
      {items.map((item) => {
        const active = isActive(item.link, activeRoute)

        return (
          <Link to={item.link} key={item.key}>
            <div className={cn(styles.item, active && styles.tracking)} key={item.key}>
              <div className={cn(styles.image, active && styles.iconTracking)}>
                {item.image}
              </div>
              <div>
                <h3 className={cn(styles.title, active && styles.titleTracking)}>
                  {item.title}
                </h3>
              </div>
            </div>
          </Link>
        )
      }
      )}
    </div>
  )
}