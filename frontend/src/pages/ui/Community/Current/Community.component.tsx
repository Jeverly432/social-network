import type { RootState } from "@app/store/root.types"
import { getCurrentCommunityAction } from "@middleware/community/community.saga"
import { memo, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import styles from "./Community.module.scss"
import { Skeleton } from "./Skeleton/Skeleton.component"
import { Head } from "./Head/Head.component"
import { Icons } from "@shared/assets"
import { setCreatedCommunity } from "@app/store/community/community.slice"
import { Post } from "@entities/common"
import { getPostsAction } from "@middleware/post/post.saga"
import { Posts } from "./Posts/Posts.component"

const CommunityPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const isLoading = useSelector((state: RootState) => state.community.isLoading.current)
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('1')
  const community = useSelector((state: RootState) => state.community.communities.current)
  const [selectedPost, setSelectedPost] = useState<string>("")

  useEffect(() => {
    dispatch(getPostsAction())
  }, [])

  useEffect(() => {
    if (slug) {
      dispatch(getCurrentCommunityAction({ pathname: slug }))
    }
    return () => {
      dispatch(setCreatedCommunity(null))
    }
  }, [dispatch, slug])

  const handleModalClose = () => {
    setSelectedPost("")
  }

  if (isLoading) {
    return <Skeleton />
  }

  const items = [
    {
      key: '1',
      label: <Icons.UI.Tabs.Posts />
    },
    {
      key: '2',
      label: <Icons.UI.Tabs.Pinned />
    },
    {
      key: '3',
      label: <Icons.UI.Tabs.Gallery />
    },
    {
      key: '4',
      label: <Icons.UI.Tabs.Video />
    }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case '1':
        return (
          <>
            <Post step={1} communityId={community?._id || null} postId={selectedPost} onModalClose={handleModalClose} />
            <Posts setSelectedPost={setSelectedPost} />
          </>
        )
      case '2':
        return <div>Pinned content</div>
      case '3':
        return <div>Gallery content</div>
      case '4':
        return <div>Video content</div>
      default:
        return null
    }
  }

  return (
    <div className={styles.wrapper}>
      <Head setActiveTab={setActiveTab} activeTab={activeTab} items={items} />
      {renderTabContent()}
    </div>
  )
}

export default memo(CommunityPage)
