import { memo, useEffect, useState } from "react"
import styles from "./Community.module.scss"
import { useNavigate } from "react-router-dom"
import { Icons } from "@shared/assets"
import { UploadComponent } from "./Upload/Upload.component"
import { Button, InputLabel, Select } from "@shared/ui"
import { categoryRules, descriptionRules, nameRules, privacyRules, selectOptions, suffix } from "./Community.data"
import { Radio } from "./Radio/Radio.component"
import { Form } from "antd"
import type { IPostCreateCommunity } from "@middleware/community/community.types"
import { useDispatch, useSelector } from "react-redux"
import { getCommunitiesAction, postCommunityAvatarAction, postCreateCommunityAction } from "@middleware/community/community.saga"
import type { RootState } from "@app/store/root.types"
import { setCreatedCommunity, setIsLoading } from "@app/store/community/community.slice"

const CommunityPage = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const dispatch = useDispatch()
  const community = useSelector((state: RootState) => state.community.communities.created)
  const isLoading = useSelector((state: RootState) => state.community.isLoading.current)

  useEffect(() => {
    dispatch(setCreatedCommunity(null))
    setAvatarFile(null)
    form.resetFields()
  }, [])

  const handleBack = () => {
    navigate(-1)
  }

  const handleSubmit = async (values: IPostCreateCommunity) => {
    try {
      console.log('Form values:', values)
      console.log('Avatar file:', avatarFile)
      dispatch(postCreateCommunityAction(values))
    } catch (error) {
    }
  }

  useEffect(() => {
    if (community && isLoading) {
      if (avatarFile) {
        dispatch(postCommunityAvatarAction({ file: avatarFile, id: community._id }))
      } else {
        dispatch(setIsLoading({ type: 'current', value: false }))
        dispatch(getCommunitiesAction())
        navigate(`/community/${community.slug}`)
      }
    }
  }, [community, isLoading, avatarFile, dispatch, navigate])


  useEffect(() => {
    if (community && !isLoading && avatarFile) {
      navigate(`/community/${community.slug}`)
    }
  }, [isLoading, community, avatarFile, navigate])

  const handleFileChange = (file: File) => {
    setAvatarFile(file)
  }

  return (
    <div className={styles.wrapper}>
      <Form
        form={form}
        className={styles.form}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <div className={styles.head}>
          <button onClick={handleBack} type="button">
            <Icons.Community.Create.ArrowBack />
          </button>
          <h2 className={styles.title}>
            Create community
          </h2>
        </div>
        <div className={styles.body}>
          <UploadComponent onFileChange={handleFileChange} />
          <div className={styles.content}>
            <Form.Item
              name="name"
              rules={nameRules}
              validateTrigger="onBlur"
              className={styles.formItem}
            >
              <InputLabel
                title="Community Name"
                placeholder="Name your community"
                maxLength={30}
                count={{ show: true }}
              />
            </Form.Item>

            <Form.Item
              name="description"
              rules={descriptionRules}
              className={styles.formItem}
              validateTrigger="onBlur"
            >
              <InputLabel
                title="About"
                placeholder="Enter description"
                maxLength={180}
                count={{ show: true }}
              />
            </Form.Item>

            <div className={styles.titleWrapper}>
              <h3 className={styles.subtitle}>
                Category
              </h3>
              <Form.Item
                name="categories"
                rules={categoryRules}
                className={styles.formItem}
                validateTrigger="onChange"
              >
                <Select
                  options={selectOptions}
                  size="middle"
                  placeholder="Select category"
                  mode="multiple"
                  suffix={suffix}
                />
              </Form.Item>
            </div>

            <div className={styles.titleWrapper}>
              <h3 className={styles.subtitle}>
                Privacy
              </h3>
              <Form.Item
                name="privacy"
                rules={privacyRules}
                className={styles.formItem}
              >
                <Radio />
              </Form.Item>
            </div>

            <Form.Item className={styles.formItem}>
              <Button variant="primary" htmlType="submit" loading={isLoading}>
                <Icons.Community.Create.Plus /> Create community
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default memo(CommunityPage)