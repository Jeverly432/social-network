import { Skeleton } from "@shared/ui/atoms"
import styles from "./CommunityItemSkeleton.module.scss"

export const CommunityItemSkeleton = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <Skeleton width={32} height={32} borderRadius={999} />
      </div>
      <div className={styles.inner}>
        <Skeleton width={196} height={12} borderRadius={12} />
        <Skeleton width={90} height={12} borderRadius={12} />
      </div>
    </div>
  )
}