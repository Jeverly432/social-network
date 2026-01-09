import { ActionButton, Input, type IInputProps } from "@shared/ui/atoms"
import styles from "./Sidebar.module.scss"
import { Notifications } from "@shared/assets"
import { Navigation, type INavigationProps } from "@shared/ui/molecules"

interface ISidebarProps {
  newNotifications: boolean
  title: string
  input: IInputProps
  navigation: INavigationProps
}

export const Sidebar = ({ title, newNotifications, input, navigation }: ISidebarProps) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.headWrapper}>
        <div className={styles.headInner}>
          <h1 className={styles.title}>
            {title}
          </h1>
          <div className={styles.notifications}>
            <ActionButton variant="secondary" size="m">
              <Notifications />
            </ActionButton>
            {newNotifications && <div className={styles.newNotification}><span></span></div>}
          </div>
        </div>
        <Input {...input} />
      </div>
      <div className={styles.navigation}>
        <Navigation  {...navigation} />
      </div>
    </div>
  )
}