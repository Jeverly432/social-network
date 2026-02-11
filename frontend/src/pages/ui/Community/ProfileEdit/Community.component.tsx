import { memo, useEffect, useState } from "react"
import styles from "./Community.module.scss"
import { useNavigate, useParams } from "react-router-dom"
import { Icons } from "@shared/assets"
import { UploadComponent } from "./Upload/Upload.component"
import { Button, InputLabel, Select } from "@shared/ui"
import { categoryRules, descriptionRules, nameRules, privacyRules, selectOptions, suffix } from "./Community.data"
import { Radio } from "./Radio/Radio.component"
import { Form } from "antd"
import type { IPostCreateCommunity } from "@middleware/community/community.types"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentCommunityAction, putUpdateCommunityAction } from "@middleware/community/community.saga"
import type { RootState } from "@app/store/root.types"
import { setCreatedCommunity } from "@app/store/community/community.slice"
import { Skeleton } from "./Skeleton/Skeleton.component"

const CommunityPage = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const dispatch = useDispatch()
  const currentCommunity = useSelector((state: RootState) => state.community.communities.current)
  const isLoading = useSelector((state: RootState) => state.community.isLoading.current)
  const { slug } = useParams<{ slug: string }>()
  const [coverImage, setCoverImage] = useState<string | null>(null)

  useEffect(() => {
    dispatch(setCreatedCommunity(null))
    setAvatarFile(null)
    form.resetFields()
    if (slug) {
      dispatch(getCurrentCommunityAction({ pathname: slug }))
    }
  }, [])

  useEffect(() => {
    if (currentCommunity && !isLoading) {
      form.setFieldsValue({
        name: currentCommunity.name,
        description: currentCommunity.description,
        categories: currentCommunity.tags,
        privacy: currentCommunity.isPublic ? 1 : 2
      })
      setCoverImage(currentCommunity.coverImage)
    }
  }, [currentCommunity, isLoading, form])

  useEffect(() => {
    if (currentCommunity && !isLoading && slug && isFormSubmitted) {
      navigate(-1)
      setIsFormSubmitted(false)
    }
  }, [currentCommunity, isLoading, slug, navigate, isFormSubmitted])

  const handleBack = () => {
    navigate(-1)
  }

  const handleSubmit = async (values: IPostCreateCommunity) => {
    try {
      if (slug) {
        console.log('Form values:', values)
        console.log('Avatar file:', avatarFile)
        setIsFormSubmitted(true)
        dispatch(putUpdateCommunityAction({ slug: slug, data: values }))
      }
    } catch (error) {
      setIsFormSubmitted(false)
    }
  }


  const handleFileChange = (file: File) => {
    setAvatarFile(file)
  }

  if (isLoading && !currentCommunity) {
    return <Skeleton />
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
            Edit community
          </h2>
        </div>
        <div className={styles.body}>
          <UploadComponent onFileChange={handleFileChange} defaultImage={coverImage ? coverImage : ""} />
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
                 Save
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default memo(CommunityPage)