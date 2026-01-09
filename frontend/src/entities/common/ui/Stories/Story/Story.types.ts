import type { ReactNode } from "react"

export interface IStoryProps {
  isWatched: boolean
  title: string
  ava: string
  icon?: ReactNode
  isVerified?: boolean
  titleClassName?: string
}