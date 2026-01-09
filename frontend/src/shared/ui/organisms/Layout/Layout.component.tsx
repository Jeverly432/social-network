import type { ReactNode } from "react"
import styles from "./Layout.module.scss"
import { Sidebar } from "@entities/common"

interface ILayoutProps {
  children: ReactNode
}

export const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}
