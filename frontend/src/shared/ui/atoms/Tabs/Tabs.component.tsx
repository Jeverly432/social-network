import { Tabs as TabsAntd, type TabsProps } from "antd"
import cn from "classnames"
import styles from "./Tabs.module.scss"

// for primary use radio buttons

type TabsVariants = /* 'primary' | */ 'secondary' | 'icon'

interface ITabsProps extends Omit<TabsProps, "size"> {
  variant: TabsVariants
}

export const Tabs = ({ className, variant, ...props }: ITabsProps) => {
  return (
    <TabsAntd className={cn(styles.tabs, styles[variant], className)} {...props} />
  )
}