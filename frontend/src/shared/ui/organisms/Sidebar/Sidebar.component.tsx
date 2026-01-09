import { ActionButton, Input } from "@shared/ui/atoms"
import styles from "./Sidebar.module.scss"
import { Notifications, Plus } from "@shared/assets"
import { Community, Navigation } from "@shared/ui/molecules"
import type { ISidebarProps } from "./Sidebar.types"

export const Sidebar = ({ title, newNotifications, input, navigation, communityData }: ISidebarProps) => {
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
      <div className={styles.communitiesSection}>
        <h2 className={styles.subtitle}>My Communites</h2>
        <div className={styles.create}>
          <div className={styles.plus}>
            <Plus />
          </div>
          <span>Create community</span>
        </div>
        <Community items={communityData} isLoading={true}/>
      </div>
    </div>
  )
}