import type { RootState } from "@app/store/root.types"
import { useSelector } from "react-redux"
import styles from "./Head.module.scss"
import { Tabs } from "@shared/ui"
import { Icons } from "@shared/assets"
import { useNavigate } from "react-router-dom"
import type { IHeadProps } from "./Head.types"

export const Head = ({ items, setActiveTab, activeTab }: IHeadProps) => {
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.user.user)

  if (user)
    return (
      <div className={styles.head}>
        <div className={styles.buttons}>
          <button onClick={() => navigate('/')}>
            <Icons.Community.Current.Arrow />
          </button>
          <button className={styles.settings} onClick={() => navigate('settings')}>
            <Icons.Community.Current.Create />
          </button>
        </div>
        <div className={styles.headWrapper}>
          <img src={user.avatar} alt={user.avatar} />
          <h2>
            {user.userName}
          </h2>
        </div>
        <div className={styles.contentWrapper}>
          {//TODO
         /*<p className={styles.description}>
            {user?.description}
          </p> */}
          <div className={styles.info}>
            <div className={styles.infoPosts}>
              <p>
                {user.followingCount}
              </p>
              <span>
                following
              </span>
            </div>
            <div className={styles.infoSlash}></div>
            <div className={styles.infoMembers}>
              <p>
                {user.followersCount}
              </p>
              <span>
              followers
              </span>
            </div>
          </div>
          <div className={styles.tabs}>
            <Tabs
              items={items}
              variant="icon"
              activeKey={activeTab}
              onChange={setActiveTab}
              className={styles.tabs}
            />
          </div>
        </div>
      </div>
    )
}