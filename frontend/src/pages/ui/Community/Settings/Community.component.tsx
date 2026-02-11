import { getCurrentCommunityAction } from "@middleware/community/community.saga"
import { memo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import type { RootState } from "@app/store/root.types"
import styles from "./Community.module.scss"
import { Icons } from "@shared/assets"
import { Skeleton } from "./Skeleton/Skeleton.component"


const Community = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { slug } = useParams<{ slug: string }>()
  const isLoading = useSelector((state: RootState) => state.community.isLoading.current)
  const currentCommunity = useSelector((state: RootState) => state.community.communities.current)

  useEffect(() => {
    if (slug) {
      dispatch(getCurrentCommunityAction({ pathname: slug }))
    }
  }, [dispatch, slug])

  const handleBack = () => {
    if (slug) {
      navigate(`/community/${slug}`)
    } else {
      navigate(-1)
    }
  }

  if (isLoading) {
    return <Skeleton />
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <button onClick={handleBack}>
          <Icons.Community.Create.ArrowBack />
        </button>
        <h2 className={styles.title}>
          {currentCommunity?.name}
        </h2>
      </div>
      <div className={styles.content}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <h3 className={styles.subtitle}>
              Basic info
            </h3>
            <ul className={styles.subList}>
              <li className={styles.subItem} onClick={() => navigate('profile-edit')}>
                <div>
                  <span>
                    <Icons.Community.Settings.Pen />
                  </span>
                  Edit profile
                </div>
                <button>
                  <Icons.Community.Create.ArrowBack className={styles.back} />
                </button>
              </li>
              {/* <li className={styles.subItem}>
                <div>
                  <span>
                    <Icons.Community.Settings.Members />
                  </span>
                  Members
                </div>
                <button>
                  <Icons.Community.Create.ArrowBack className={styles.back} />
                </button>
              </li> */}
            </ul>
          </li>
          <li className={styles.item}>
        {/*     <h3 className={styles.subtitle}>
              Community permissions
            </h3> */}
           {/*  <ul className={styles.subList}>
              <li className={styles.subItem}>
                <div>
                  <span>
                    <Icons.Community.Settings.Story />
                  </span>
                  Story comments
                </div>
                <button>
                  <Icons.Community.Create.ArrowBack className={styles.back} />
                </button>
              </li>
            </ul> */}
          </li>
          <li className={styles.item}>
            <div className={styles.leave}>
              <button >Leave community</button>
            </div>
          </li>
        {/*   <li className={styles.buttonItem}>
            <button>Close community</button>
            <p>Closing this community will remove the community  page and all its content and comments. </p>
          </li> */}
        </ul>
      </div>
    </div>
  )
}

export default memo(Community)