import { useDispatch, useSelector } from "react-redux"
import styles from "./Post.module.scss"
import type { RootState } from "@app/store/root.types"
import { Link } from "react-router-dom"
import { ActionButton, Input } from "@shared/ui"
import { Icons } from "@shared/assets"
import { Modals } from "./Modals/Modal.component"
import type { IPost } from "./Post.types"
import { setModalOpen } from "@app/store/post/post.slice"

export const Post = ({ step, communityId, postId, onModalClose }: IPost) => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.user)
  const postModal = useSelector((state: RootState) => state.post.modalOpen)

  const handleOpenModal = () => {
    dispatch(setModalOpen(true))
  }

  const handleToggleModal = () => {
    if (postModal) {
      onModalClose?.()
    }
    dispatch(setModalOpen(!postModal))
  }

  return (
    <>
      <div className={styles.wrapper}>
        <Link to={`/${user?.userName}`} className={styles.user}>
          <img src={user?.avatar} alt={user?.userName} />
        </Link>
        <Input placeholder="What's going on?" variant="rounded" className={styles.input} size="s" onClick={handleOpenModal} />
        <ActionButton size="m" variant="secondary">
          <Icons.Community.Current.ImageIcon />
        </ActionButton>
        <ActionButton size="m" variant="secondary">
          <Icons.Community.Current.Play />
        </ActionButton>
        <ActionButton size="m" variant="secondary">
          <Icons.Community.Current.Pin />
        </ActionButton>
        <ActionButton size="m" variant="secondary">
          <Icons.Community.Current.Chart />
        </ActionButton>
        <ActionButton size="m" variant="secondary">
          <Icons.Community.Current.New />
        </ActionButton>
      </div>
      <Modals isOpen={postModal} setIsOpen={handleToggleModal} stepCount={step} communityId={communityId} postId={postId}/>
    </>
  )
}