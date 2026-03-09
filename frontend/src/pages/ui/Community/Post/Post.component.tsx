import type { RootState } from "@app/store/root.types"
import { postLeaveCommunityAction } from "@middleware/community/community.saga"
import { Skeleton } from "@shared/ui"
import { memo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import styles from "./Post.module.scss"
import { Icons } from "@shared/assets"
import { getPostAction } from "@middleware/post/post.saga"

const Post = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id, slug } = useParams<{ id: string, slug: string }>()
  const isLoading = useSelector((state: RootState) => state.community.isLoading.current)
  const currentCommunity = useSelector((state: RootState) => state.community.communities.current)

  useEffect(() => {
    if (id) {
      dispatch(getPostAction({ id: id }))
    }
  }, [dispatch, id])

  const handleBack = () => {
    if (id) {
      navigate(`/community/${slug}`)
    } else {
      navigate(-1)
    }
  }

  if (isLoading) {
    return <Skeleton />
  }

  const handleLeave = () => {
    if (currentCommunity) {
      dispatch(postLeaveCommunityAction({ id: currentCommunity._id }))
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <button onClick={handleBack}>
          <Icons.Community.Create.ArrowBack />
        </button>
        <h2 className={styles.title}>
          Post
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
          <li className={styles.item} onClick={handleLeave}>
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

export default memo(Post)