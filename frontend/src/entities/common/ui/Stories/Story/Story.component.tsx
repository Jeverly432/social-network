import type { IStoryProps } from "./Story.types"
import styles from "./Story.module.scss"
import cn from "classnames"
import { Verification } from "@shared/assets"

export const Story = ({ ava, isVerified = false, isWatched, title, icon, titleClassName }: IStoryProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={cn(styles.avaWrapper, !isWatched && styles.avaNotWatched)}>
        <div className={styles.avaBorder}>
          <div className={styles.ava}>
            <img src={ava} alt={title} />
          </div>
        </div>
        {isVerified && icon ? icon : <Verification className={styles.verification} />}
      </div>
      <div className={cn(styles.title, titleClassName)}>
        {title}
      </div>
    </div>
  )
}