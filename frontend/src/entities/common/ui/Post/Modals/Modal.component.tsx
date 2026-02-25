import { useEffect, useState } from "react"
import styles from "./Modal.module.scss"
import { ActionButton, Button, Input, Modal } from "@shared/ui"
import { Input as AntInput, Form, Tooltip } from "antd"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@app/store/root.types"
import { Icons } from "@shared/assets"
import type { IModals } from './Modal.types'
import { postPostAction } from "@middleware/post/post.saga"

const { TextArea } = AntInput;

export const Modals = ({ isOpen, setIsOpen, stepCount, communityId = null, postId = null }: IModals) => {
  const [step, setStep] = useState<number>(stepCount)
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(communityId)
  const myCommunities = useSelector((state: RootState) => state.community.communities)
  const post = useSelector((state: RootState) => state.post)
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [images, setImages] = useState<File[] | []>([])
  const posts = useSelector((state: RootState) => state.community.posts)

  useEffect(() => {
    if (postId) {
      const currentPost = posts.find((post) => post._id === postId)
      if (currentPost) {
        form.setFieldsValue({
          title: currentPost.title,
          description: currentPost.description
        })
      }
    }
  }, [postId])

  useEffect(() => {
    if (!isOpen) {
      form.resetFields()
      setImages([])
      setSelectedCommunityId(null)
    }
  }, [isOpen, form])

  useEffect(() => {
    if (!stepCount) {
      setStep(0)
    } else {
      setStep(stepCount)
    }
  }, [setIsOpen])

  const handleSubmit = (values: { title: string; description: string }) => {
    dispatch(postPostAction({
      communityId: selectedCommunityId || null,
      title: values.title || "",
      description: values.description || "",
      images: images
    }))
  }

  const handleNextStep = (id: string) => {
    setStep(1)
    setSelectedCommunityId(id)
  }

  const handleImageButtonClick = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.multiple = true
    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement
      if (target.files) {
        setImages(Array.from(target.files))
      }
    }
    input.click()
  }

  const getContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div className={styles.wrapper}>
            <h2 className={styles.title}>
              Post to
            </h2>
            <div className={styles.content}>
              <span className={styles.description}>
                My Communities
              </span>
              <ul className={styles.list}>
                {myCommunities.list.map((community) => (
                  <li className={styles.item} onClick={() => handleNextStep(community._id)}>
                    <div>
                      <img src={community.coverImage} alt={community.name} />
                    </div>
                    <h3>
                      {!community.isPublic && <Icons.UI.Private />}
                      {community.name}
                      {community.verification && <Icons.UI.Verification />}
                    </h3>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      case 1:
        return (
          <div className={styles.wrapper}>
            <h2 className={styles.title}>
              All about plants
            </h2>
            <Form className={styles.content} form={form} onFinish={handleSubmit}>
              <div className={styles.inputs}>
                <Form.Item
                  className={styles.formItem}
                  name="title"
                  validateTrigger="onBlur"
                  rules={[{ required: true, message: 'Title is required' }]}
                >
                  <Input className={styles.input} placeholder="What's the key of this post" maxLength={30} />
                </Form.Item>
                <Form.Item
                  className={styles.formItem}
                  name="description"
                  validateTrigger="onBlur"
                  rules={[{ required: true, message: 'Description is required' }]}
                >
                  <TextArea
                    className={styles.textarea}
                    placeholder="Share the details or context of your post here…"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                </Form.Item>
              </div>
              <div className={styles.files}>
                <ActionButton
                  size="m"
                  variant="secondary"
                  onClick={handleImageButtonClick}
                >
                  <Icons.Community.Current.ImageIcon />
                </ActionButton>
                {images.length > 0 && (
                  <span className={styles.imageCount}>{images.length} image</span>
                )}
                <Tooltip placement="top" title="Soon...">
                  <ActionButton size="m" variant="secondary">
                    <Icons.Community.Current.Play />
                  </ActionButton>
                </Tooltip>
                <Tooltip placement="top" title="Soon...">
                  <ActionButton size="m" variant="secondary">
                    <Icons.Community.Current.Pin />
                  </ActionButton>
                </Tooltip>
              </div>
              <Form.Item>
                <Button className={styles.button} loading={post.isLoading} htmlType="submit">
                  Post
                </Button>
              </Form.Item>
            </Form>
          </div>
        )
    }
  }

  return (
    <Modal
      open={isOpen}
      className={styles.modal}
      onCancel={setIsOpen}
    >
      {getContent(step)}
    </Modal>
  )
}
