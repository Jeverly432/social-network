import type { ITagProps } from "./Tag.types"
import styles from "./Tag.module.scss"
import { forwardRef } from "react"

export const Tag = forwardRef<HTMLDivElement, ITagProps>(({ title, style }, ref) => {
  return (
    <div className={styles.tag} ref={ref} style={style}>
      {title}
    </div>
  )
})