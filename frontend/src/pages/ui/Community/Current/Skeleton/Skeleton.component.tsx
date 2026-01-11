import { Skeleton as BaseSkeleton } from "@shared/ui"
import styles from "./Skeleton.module.scss"

export const Skeleton = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <div className={styles.cover}>
          <BaseSkeleton
            width="100%"
            height={273}
            borderRadius={0}
            animation="wave"
          />
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.title}>
            <BaseSkeleton
              width={130}
              height={24}
              variant="text"
              animation="wave"
              borderRadius={12}
            />
          </div>
          <div className={styles.tags}>
            <BaseSkeleton
              width={80}
              height={18}
              borderRadius={20}
              animation="wave"
            />
            <BaseSkeleton
              width={30}
              height={18}
              borderRadius={20}
              animation="wave"
            />
            <BaseSkeleton
              width={50}
              height={18}
              borderRadius={20}
              animation="wave"
            />
            <BaseSkeleton
              width={60}
              height={18}
              borderRadius={20}
              animation="wave"
            />
            <BaseSkeleton
              width={50}
              height={18}
              borderRadius={20}
              animation="wave"
            />
          </div>
          <div className={styles.description}>
            <BaseSkeleton
              width="100%"
              height={20}
              variant="text"
              animation="wave"
              style={{ marginBottom: 4 }}
              borderRadius={12}
            />

          </div>
          <div className={styles.info}>
            <div className={styles.infoPosts}>
              <BaseSkeleton
                width={40}
                height={20}
                variant="text"
                animation="wave"
                borderRadius={12}
              />
            </div>
            <div className={styles.infoSlash}></div>
            <div className={styles.infoMembers}>
              <BaseSkeleton
                width={50}
                height={20}
                variant="text"
                animation="wave"
                borderRadius={12}
              />
            </div>
          </div>
          <div className={styles.tabs}>
            <BaseSkeleton
              width={30}
              height={30}
              borderRadius={8}
              animation="wave"
            />
            <BaseSkeleton
              width={30}
              height={30}
              borderRadius={8}
              animation="wave"
            />
            <BaseSkeleton
              width={30}
              height={30}
              borderRadius={8}
              animation="wave"
            />
            <BaseSkeleton
              width={30}
              height={30}
              borderRadius={8}
              animation="wave"
            />
          </div>
        </div>
      </div>
    </div>
  )
}