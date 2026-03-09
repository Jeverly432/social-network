import { Skeleton as BaseSkeleton } from "@shared/ui"
import styles from "../Posts.module.scss"

export const PostSkeleton = () => {
  return (
    <li className={styles.item}>
      <div className={styles.body}>
        <div className={styles.headWrapper}>
          <div className={styles.imageWrapper}>
            <BaseSkeleton
              width={32}
              height={32}
              borderRadius={999}
              animation="wave"
            />
          </div>
          <div className={styles.head}>
            <BaseSkeleton
              width={120}
              height={8}
              animation="wave"
              borderRadius={4}
              style={{ marginTop: "4px" }}
            />
            <div className={styles.nameWrapper}>
              <BaseSkeleton
                width={80}
                height={8}
                animation="wave"
                borderRadius={20}
                style={{ marginTop: '4px' }}
              />
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <BaseSkeleton
            width="80%"
            height={8}
            animation="wave"
            borderRadius={4}
            className={styles.title}
            style={{ marginTop: '12px' }}
          />
          <BaseSkeleton
            width="100%"
            height={8}
            animation="wave"
            borderRadius={4}
          />
          <BaseSkeleton
            width="90%"
            height={8}
            animation="wave"
            borderRadius={4}
            style={{ marginBottom: '90px' }}
          />
        </div>
      </div>
    </li>
  )
}
