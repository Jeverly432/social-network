import type { RootState } from "@app/store/root.types"
import { getCurrentCommunityAction } from "@middleware/community/community.saga"
import { memo, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import styles from "./Community.module.scss"
import { Skeleton } from "./Skeleton/Skeleton.component"
import { Head } from "./Head/Head.component"
import { Post } from "./Post/Post.component"
import { Tabs as TabsIcons } from "@shared/assets"


const CommunityPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const isLoading = useSelector((state: RootState) => state.community.isLoading.current)
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('1')

  useEffect(() => {
    if (slug) {
      dispatch(getCurrentCommunityAction({ pathname: slug }))
    }
  }, [dispatch, slug])

  if (isLoading) {
    return <Skeleton />
  }

  const items = [
    {
      key: '1',
      label: <TabsIcons.Posts />
    },
    {
      key: '2',
      label: <TabsIcons.Pinned />
    },
    {
      key: '3',
      label: <TabsIcons.Gallery />
    },
    {
      key: '4',
      label: <TabsIcons.Video />
    }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case '1':
        return <Post />
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