import { ActionButton, Community, Input, Navigation } from "@shared/ui"
import { Notifications, Plus } from "@shared/assets"
import { useLocation, useParams } from "react-router-dom"
import { data } from "./Sidebar.data"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getCommunitiesAction } from "@middleware/community/community.saga"
import type { RootReducer } from "@app/store/root.reducer"
import styles from "./Sidebar.module.scss"

export const Sidebar = () => {
  const location = useLocation()
  const pathname = location.pathname
  const dispatch = useDispatch()
  const communities = useSelector((state: RootReducer) => state.community.communities.list)
  const communitiesIsLoading = useSelector((state: RootReducer) => state.community.isLoading.list)
  const params = useParams<{ slug: string }>()
  const [newNotification, setNewNotification] = useState<boolean>(false)

  useEffect(() => {
    //TODO notifications logic
    setNewNotification(true)
    dispatch(getCommunitiesAction())
  }, [])

  return (
    <div className={styles.sidebar}>
      <div className={styles.headWrapper}>
        <div className={styles.headInner}>
          <h1 className={styles.title}>
            Community
          </h1>
          <div className={styles.notifications}>
            <ActionButton variant="secondary" size="m">
              <Notifications />
            </ActionButton>
            {newNotification && <div className={styles.newNotification}><span></span></div>}
          </div>
        </div>
        <Input placeholder="Search community and user" />
      </div>
      <div className={styles.navigation}>
        <Navigation items={data} activeRoute={pathname} />
      </div>
      <div className={styles.communitiesSection}>
        <h2 className={styles.subtitle}>My Communites</h2>
        <div className={styles.create}>
          <div className={styles.plus}>
            <Plus />
          </div>
          <span>Create community</span>
        </div>
        <Community items={communities} isLoading={communitiesIsLoading} activeSlug={params.slug || ""} />
      </div>
    </div>
  )
}