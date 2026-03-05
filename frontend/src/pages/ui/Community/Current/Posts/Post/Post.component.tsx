import styles from "../Posts.module.scss"
import { Icons } from "@shared/assets"
import { formatTimeAgo } from "@shared/lib"
import { ActionButton, Dropdown } from "@shared/ui"
import classNames from "classnames"
import { useDispatch, useSelector } from "react-redux"
import { deletePostAction, putLikePostAction } from "@middleware/post/post.saga"
import { setModalOpen } from "@app/store/post/post.slice"
import type { RootState } from "@app/store/root.types"
import type { IPost } from "./Post.types"
import { useState } from "react"
import { getLike } from "./Post.data"
import { useNavigate } from "react-router-dom"

export const Post = ({ post, setSelectedPost }: IPost) => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.user)
  const [hasLike, setHasLike] = useState<boolean | undefined>(getLike(user && user._id, post.likes))
  const [likeCount, setLikeCount] = useState<number>(post.likesCount)
  const url = import.meta.env.VITE_APP_URL
  const navigation = useNavigate()

  const handlePostDelete = (id: string) => {
    dispatch(deletePostAction(id))
  }

  const handlePostEdit = (id: string) => {
    setSelectedPost(id)
    dispatch(setModalOpen(true))
  }

  const handleLikePost = (id: string) => {
    setHasLike(!hasLike)
    dispatch(putLikePostAction(id))
    hasLike ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1)
  }

  const handleCopy = async (id: string) => {
    try {
      await navigator.clipboard.writeText(`${url}/community/${post.community?.slug}/post/${id}`);
    } catch (err) {
      console.error('Ошибка:', err);
    }
  }

  const dropdownItems = [
    {
      key: '1',
      label: 'Edit',
      onClick: () => handlePostEdit(post._id)
    },
    {
      key: '2',
      label: 'Delete',
      onClick: () => handlePostDelete(post._id)
    },
  ]

  return (
    <li key={post._id || Math.random()} className={styles.item}>
      <div className={styles.body}>
        <div className={styles.headWrapper}>
          <div className={styles.imageWrapper}>
            {/* <img src={post.community?.coverImage} /> */}
          </div>
          <div className={styles.head}>
            <h3>
              {user?.userName}
            </h3>
            <div className={styles.nameWrapper}>
              <div className={styles.moderator}>
                <Icons.Community.Current.Verification /> Moderator
              </div>
              <div className={styles.date}>
                •
                {post.updatedAt && formatTimeAgo(post.updatedAt)}
              </div>
            </div>
          </div>
          <Dropdown
            size="m"
            variant="primary"
            trigger={['click']}
            placement="bottomCenter"
            arrow
            menu={{
              items: dropdownItems,
            }}
          >
            <ActionButton variant="inverse" size="s" className={styles.settings}>
              <Icons.Community.Current.Create />
            </ActionButton>
          </Dropdown>
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>
            {post.title}
          </h2>
          <p className={styles.description}>
            {post.description}
          </p>
        </div>
        {post.images.length > 0 && (
          <ul className={styles.gallery}>
            {post.images.map((image) => (
              <li key={image}>
                <img src={image} alt={image} />
              </li>
            ))}
          </ul>
        )}
        <div className={styles.reactionWrapper}>
          <div className={styles.likes}>
            {likeCount} likes
          </div>
          <div className={styles.comments}>
            {post.commentsCount} comments
          </div>
        </div>
        <div className={styles.likesWrapper}>
          <div className={styles.likeWrapper}>
            <div className={classNames(styles.like, hasLike && styles.active)} onClick={() => handleLikePost(post._id)}>
              {hasLike === true ? <Icons.Post.Reaction /> : <Icons.Post.Like />} Like
            </div>
            <div className={styles.comment} onClick={() => navigation(`post/${post._id}`)}>
              <Icons.Post.Comment /> Comment
            </div>
          </div>
          <Dropdown
            size="m"
            variant="primary"
            trigger={['click']}
            placement="topCenter"
            arrow
            menu={{
              items: [
                {
                  key: '1',
                  label: 'Copy link',
                  onClick: () => handleCopy(post._id)
                },
              ]
            }}
          >
            <div className={styles.share}>
              <Icons.Post.Share />
            </div>
          </Dropdown>
        </div>
      </div>
    </li >
  )
}
