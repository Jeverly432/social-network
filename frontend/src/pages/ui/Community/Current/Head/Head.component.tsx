import type { RootState } from "@app/store/root.types"
import { useSelector } from "react-redux"
import styles from "./Head.module.scss"
import { ActionButton, Tabs } from "@shared/ui"
import Cover from "@shared/assets/images/image/cover-image.webp"
import { Icons } from "@shared/assets"
import { useNavigate } from "react-router-dom"
import type { IHeadProps } from "./Head.types"

export const Head = ({ items, setActiveTab, activeTab }: IHeadProps) => {
  const community = useSelector((state: RootState) => state.community.communities.current)
  const navigate = useNavigate()

  return (
    <div className={styles.head}>
      <ActionButton variant="tertiary" size="m" className={styles.button} onClick={() => navigate('/')}>
        <Icons.Community.Current.Arrow />
      </ActionButton>
      <ActionButton variant="tertiary" size="m" className={styles.settings} onClick={() => navigate('settings')}>
        <Icons.Community.Current.Create />
      </ActionButton>
      <div className={styles.cover}>
        <img src={community?.coverImage || Cover} alt={community?.slug} />
      </div>
      <div className={styles.contentWrapper}>
        <h2 className={styles.title}>
          {community?.name}
        </h2>
        {community?.tags && community?.tags.length > 0 && <ul className={styles.tags}>
          {community?.tags.map((tag, index) => (
            <li key={`${tag}-${index}`}>{tag}</li>
          ))}
        </ul>}
        {community?.description && <p className={styles.description}>
          {community?.description}
        </p>}
        <div className={styles.info}>
          <div className={styles.infoPosts}>
            <p>
              {community?.postsCount}
            </p>
            <span>
              posts
            </span>
          </div>
          <div className={styles.infoSlash}></div>
          <div className={styles.infoMembers}>
            <p>
              {community?.membersCount}
            </p>
            <span>
              members
            </span>
          </div>
        </div>
        <div className={styles.tabs}>
          <Tabs
            items={items}
            variant="icon"
            activeKey={activeTab}
            onChange={setActiveTab}
          />
        </div>
      </div>
    </div>
  )
}