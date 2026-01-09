import type { ReactNode } from "react";

export interface NavigationItem {
  image: ReactNode
  title: string
  key: string
  link: string
}

export interface INavigationProps {
  items: NavigationItem[]
  activeRoute: string
}