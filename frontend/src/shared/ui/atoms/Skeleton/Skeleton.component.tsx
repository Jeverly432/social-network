import type { ISkeletonProps } from "./Skeleton.types"
import type { CSSProperties } from "react"
import styles from "./Skeleton.module.scss"
import cn from "classnames"

export const Skeleton = ({
  width = "100%",
  height = 20,
  borderRadius = 4,
  className,
  style,
  variant = "rect",
  animation = "pulse",
  backgroundColor,
  highlightColor,
}: ISkeletonProps) => {
  const skeletonStyle: CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    borderRadius: typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius,
    backgroundColor,
    ...style,
  }

  const cssVariables = {
    "--skeleton-highlight-color": highlightColor,
  } as CSSProperties

  return (
    <div
      className={cn(
        styles.skeleton,
        styles[variant],
        styles[animation],
        className
      )}
      style={{ ...skeletonStyle, ...cssVariables }}
    />
  )
}

