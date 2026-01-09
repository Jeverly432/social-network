import type { ICommunityProps } from "./Community.types"
import { CommunityItem } from "./CommunityItem/CommunityItem.component"
import styles from "./Community.module.scss"

export const Community = ({ items }: ICommunityProps) => {
  return (
    <div className={styles.wrapper}>
      {items.map((item) => (
        <CommunityItem {...item} key={item.name} />
      ))}
    </div>
  )
}