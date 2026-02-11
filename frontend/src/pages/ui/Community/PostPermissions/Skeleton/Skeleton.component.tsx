import { Skeleton as BaseSkeleton } from "@shared/ui"
import styles from "./Skeleton.module.scss"
import communityStyles from "../Community.module.scss"
import cn from "classnames"

export const Skeleton = () => {
  return (
    <div className={cn(communityStyles.wrapper,communityStyles.skeleton)}>
      <div className={communityStyles.head}>
        <BaseSkeleton
          width={24}
          height={24}
          borderRadius={4}
          animation="wave"
        />
        <BaseSkeleton
          width={180}
          height={24}
          borderRadius={4}
          animation="wave"
          className={styles.titleSkeleton}
        />
        <div style={{ width: 24 }} />
      </div>
      <div className={communityStyles.content}>
        <ul className={communityStyles.list}>
          <li className={communityStyles.item}>
            <BaseSkeleton
              width={120}
              height={20}
              borderRadius={4}
              animation="wave"
              className={styles.subtitleSkeleton}
            />
            <ul className={communityStyles.subList}>
              <li className={communityStyles.subItem}>
                <div>
                  <BaseSkeleton
                    width={24}
                    height={24}
                    borderRadius={4}
                    animation="wave"
                  />
                  <BaseSkeleton
                    width={120}
                    height={20}
                    borderRadius={4}
                    animation="wave"
                  />
                </div>
                <BaseSkeleton
                  width={24}
                  height={24}
                  borderRadius={4}
                  animation="wave"
                />
              </li>
              <li className={communityStyles.subItem}>
                <div>
                  <BaseSkeleton
                    width={24}
                    height={24}
                    borderRadius={4}
                    animation="wave"
                  />
                  <BaseSkeleton
                    width={100}
                    height={20}
                    borderRadius={4}
                    animation="wave"
                  />
                </div>
                <BaseSkeleton
                  width={24}
                  height={24}
                  borderRadius={4}
                  animation="wave"
                />
              </li>
            </ul>
          </li>
          <li className={communityStyles.item}>
            <BaseSkeleton
              width={200}
              height={20}
              borderRadius={4}
              animation="wave"
              className={styles.subtitleSkeleton}
            />
            <ul className={communityStyles.subList}>
              <li className={communityStyles.subItem}>
                <div>
                  <BaseSkeleton
                    width={24}
                    height={24}
                    borderRadius={4}
                    animation="wave"
                  />
                  <BaseSkeleton
                    width={140}
                    height={20}
                    borderRadius={4}
                    animation="wave"
                  />
                </div>
                <BaseSkeleton
                  width={24}
                  height={24}
                  borderRadius={4}
                  animation="wave"
                />
              </li>
              <li className={communityStyles.subItem}>
                <div>
                  <BaseSkeleton
                    width={24}
                    height={24}
                    borderRadius={4}
                    animation="wave"
                  />
                  <BaseSkeleton
                    width={130}
                    height={20}
                    borderRadius={4}
                    animation="wave"
                  />
                </div>
                <BaseSkeleton
                  width={24}
                  height={24}
                  borderRadius={4}
                  animation="wave"
                />
              </li>
            </ul>
          </li>
          <li className={communityStyles.item}>
            <div className={styles.leave}>
              <BaseSkeleton
                width={150}
                height={20}
                borderRadius={4}
                animation="wave"
              />
            </div>
          </li>
          <li className={styles.lastItem}>
            <BaseSkeleton
              width={160}
              height={20}
              borderRadius={4}
              animation="wave"
            />
            <BaseSkeleton
              width="100%"
              height={16}
              borderRadius={4}
              animation="wave"
              className={styles.descriptionSkeleton}
            />
          </li>
        </ul>
      </div>
    </div>
  )
}