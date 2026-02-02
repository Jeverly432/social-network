import { Skeleton as BaseSkeleton } from "@shared/ui"
import styles from "./Skeleton.module.scss"
import communityStyles from "../Community.module.scss"

export const Skeleton = () => {
  return (
    <div className={communityStyles.wrapper}>
      {/* Head skeleton */}
      <div className={communityStyles.head}>
        <BaseSkeleton
          width={24}
          height={24}
          borderRadius={4}
          animation="wave"
        />
        <BaseSkeleton
          width={160}
          height={24}
          borderRadius={4}
          animation="wave"
          className={styles.titleSkeleton}
        />
        <div style={{ width: 24 }} />
      </div>

      {/* Body skeleton */}
      <div className={communityStyles.body}>
        {/* Upload skeleton */}
        <BaseSkeleton
          width="100%"
          height={273}
          borderRadius={0}
          animation="wave"
        />

        {/* Content skeleton */}
        <div className={communityStyles.content}>
          {/* Community Name field */}
          <div className={styles.fieldWrapper}>
            <BaseSkeleton
              width={140}
              height={16}
              borderRadius={4}
              animation="wave"
              className={styles.labelSkeleton}
            />
            <BaseSkeleton
              width="100%"
              height={48}
              borderRadius={8}
              animation="wave"
            />
          </div>

          {/* About field */}
          <div className={styles.fieldWrapper}>
            <BaseSkeleton
              width={60}
              height={16}
              borderRadius={4}
              animation="wave"
              className={styles.labelSkeleton}
            />
            <BaseSkeleton
              width="100%"
              height={96}
              borderRadius={8}
              animation="wave"
            />
          </div>

          {/* Category section */}
          <div className={communityStyles.titleWrapper}>
            <BaseSkeleton
              width={100}
              height={20}
              borderRadius={4}
              animation="wave"
              className={styles.subtitleSkeleton}
            />
            <BaseSkeleton
              width="100%"
              height={48}
              borderRadius={8}
              animation="wave"
            />
          </div>

          {/* Privacy section */}
          <div className={communityStyles.titleWrapper}>
            <BaseSkeleton
              width={80}
              height={20}
              borderRadius={4}
              animation="wave"
              className={styles.subtitleSkeleton}
            />
            <div className={styles.radioWrapper}>
              {/* Public option */}
              <div className={styles.radioItem}>
                <div className={styles.radioContent}>
                  <BaseSkeleton
                    width={40}
                    height={40}
                    borderRadius="50%"
                    animation="wave"
                    className={styles.radioIcon}
                  />
                  <div className={styles.radioText}>
                    <BaseSkeleton
                      width={60}
                      height={16}
                      borderRadius={4}
                      animation="wave"
                    />
                    <BaseSkeleton
                      width="100%"
                      height={14}
                      borderRadius={4}
                      animation="wave"
                      className={styles.radioDescription}
                    />
                  </div>
                </div>
                <BaseSkeleton
                  width={20}
                  height={20}
                  borderRadius="50%"
                  animation="wave"
                />
              </div>
              {/* Private option */}
              <div className={styles.radioItem}>
                <div className={styles.radioContent}>
                  <BaseSkeleton
                    width={40}
                    height={40}
                    borderRadius="50%"
                    animation="wave"
                    className={styles.radioIcon}
                  />
                  <div className={styles.radioText}>
                    <BaseSkeleton
                      width={70}
                      height={16}
                      borderRadius={4}
                      animation="wave"
                    />
                    <BaseSkeleton
                      width="100%"
                      height={14}
                      borderRadius={4}
                      animation="wave"
                      className={styles.radioDescription}
                    />
                  </div>
                </div>
                <BaseSkeleton
                  width={20}
                  height={20}
                  borderRadius="50%"
                  animation="wave"
                />
              </div>
            </div>
          </div>

          {/* Save button */}
          <BaseSkeleton
            width="100%"
            height={48}
            borderRadius={8}
            animation="wave"
          />
        </div>
      </div>
    </div>
  )
}

