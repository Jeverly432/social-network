import type { ICommunityProps } from "./Community.types"
import { CommunityItem } from "./CommunityItem/CommunityItem.component"
import styles from "./Community.module.scss"
import { CommunityItemSkeleton } from "./CommunityItem/CommunityItemSkeleton/CommunityItemSkeleton.component"

export const Community = ({ items, isLoading, activeSlug }: ICommunityProps) => {
  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        {Array.from({ length: 4 }).map((_, index) => (
          <CommunityItemSkeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      {items && items.map((item) => (
        <CommunityItem {...item} key={item.name} activeSlug={activeSlug} />
      ))}
    </div>
  )
}
