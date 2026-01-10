import type { RootState } from "@app/store/root.types"
import { getCurrentCommunityAction } from "@middleware/community/community.saga"
import { memo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import styles from "./Community.module.scss"

const CommunityPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const community = useSelector((state: RootState) => state.community.communities.current)
  const dispatch = useDispatch()

  useEffect(() => {
    if (slug) {
      dispatch(getCurrentCommunityAction({ pathname: slug }))
    }
  }, [dispatch, slug])

  return (
    <div className={styles.wrapper}>
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
          <div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(CommunityPage)