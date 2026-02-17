import { useEffect, useState } from "react"
import styles from "./Modal.module.scss"
import { ActionButton, Button, Input, Modal } from "@shared/ui"
import { Input as AntInput, Form } from "antd"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@app/store/root.types"
import { Icons } from "@shared/assets"
import type { IModals } from './Modal.types'

const { TextArea } = AntInput;

export const Modals = ({ isOpen, setIsOpen }: IModals) => {
  const [step, setStep] = useState<number>(1)
  const myCommunities = useSelector((state: RootState) => state.community.communities)
  const post = useSelector((state: RootState) => state.post)
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [coverImages, setCoverImages] = useState<string[] | []>([])

  useEffect(() => {
    form.resetFields()
  }, [])

  useEffect(() => {
/*     if (myCommunities && !post.isLoading) {
      form.setFieldsValue({
        name: currentCommunity.name,
        description: currentCommunity.description,
        categories: currentCommunity.tags,
        privacy: currentCommunity.isPublic ? 1 : 2
      })
      setCoverImage(currentCommunity.coverImage)
    } */
  }, [myCommunities, post.isLoading, form])

  useEffect(() => {
    setStep(1)
  }, [setIsOpen])

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
                  <li className={styles.item} onClick={() => setStep(1)}>
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
            <Form className={styles.content}>
              <div className={styles.inputs}>
                <Form.Item className={styles.formItem}>
                  <Input className={styles.input} placeholder="What's the key of this post" />
                </Form.Item>
                <Form.Item className={styles.formItem}>
                  <TextArea
                    className={styles.textarea}
                    placeholder="Share the details or context of your post here…"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                </Form.Item>
              </div>
              <div className={styles.files}>
                <ActionButton size="m" variant="secondary">
                  <Icons.Community.Current.ImageIcon />
                </ActionButton>
                <ActionButton size="m" variant="secondary">
                  <Icons.Community.Current.Play />
                </ActionButton>
                <ActionButton size="m" variant="secondary">
                  <Icons.Community.Current.Pin />
                </ActionButton>
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
