import type { RootState } from "@app/store/root.types"
import { useSelector } from "react-redux"
import styles from "./Head.module.scss"
import { Tabs } from "@shared/ui"
import type { CompatibilityProps } from "antd/es/tabs"
import type { Tab } from '@rc-component/tabs/lib/interface';

interface IHeadProps {
  items: (Tab & CompatibilityProps)[]
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
  activeTab: string
}

export const Head = ({ items, setActiveTab, activeTab }: IHeadProps) => {
  const community = useSelector((state: RootState) => state.community.communities.current)

  return (
    <div className={styles.head}>
      <div className={styles.cover}>
        <img src={community?.coverImage} alt={community?.slug} />
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