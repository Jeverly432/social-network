import { memo, useEffect, useState } from "react"
import { Head } from "./Head/Head.component"
import { items } from "./Profile.data"
import styles from "./Profile.module.scss"
import { Post } from "@entities/common"
import type { RootState } from "@app/store/root.types"
import { useDispatch, useSelector } from "react-redux"
import { Posts } from "@pages/ui/Community/Current/Posts/Posts.component"
import { getUserPostsAction } from "@middleware/post/post.saga"

const Profile = () => {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('1')
  const user = useSelector((state: RootState) => state.user.user)
  const [selectedPost, setSelectedPost] = useState<string>("")

  useEffect(() => {
    if (user?.userName) {
      dispatch(getUserPostsAction(user.userName))
    }
  }, [dispatch, user?.userName])

  const handleModalClose = () => {
    setSelectedPost("")
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case '1':
        return (
          <>
            <Post step={1} communityId={null} postId={selectedPost} onModalClose={handleModalClose} />
            <Posts setSelectedPost={setSelectedPost} userName={user?.userName} />
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
      <Head activeTab={activeTab} items={items} setActiveTab={setActiveTab} />
      {renderTabContent()}
    </div>
  )
}

export default memo(Profile)