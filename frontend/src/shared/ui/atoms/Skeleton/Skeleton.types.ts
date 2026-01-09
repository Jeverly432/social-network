import type { CSSProperties } from "react"

export interface ISkeletonProps {
  width?: number | string
  height?: number | string
  borderRadius?: number | string
  className?: string
  style?: CSSProperties
  variant?: "rect" | "circle" | "text"
  animation?: "pulse" | "wave" | "none"
  backgroundColor?: string
  highlightColor?: string
}

