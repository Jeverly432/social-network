import { getCurrentCommunityAction } from "@middleware/community/community.saga"
import { memo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import type { RootState } from "@app/store/root.types"
import styles from "./Community.module.scss"
import { Icons } from "@shared/assets"
import { Skeleton } from "./Skeleton/Skeleton.component"
import { Form, type RadioChangeEvent } from "antd"
import { Radio as RadioAntd } from 'antd';
import { Item } from "../ProfileEdit/Radio/Item/Item.component"
import { Button } from "@shared/ui"

const Community = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { slug } = useParams<{ slug: string }>()
  const isLoading = useSelector((state: RootState) => state.community.isLoading.current)
  const currentCommunity = useSelector((state: RootState) => state.community.communities.current)

  useEffect(() => {
    if (slug) {
      dispatch(getCurrentCommunityAction({ pathname: slug }))
    }
  }, [dispatch, slug])

  const handleBack = () => {
    if (slug) {
      navigate(`/community/${slug}`)
    } else {
      navigate(-1)
    }
  }

  if (isLoading) {
    return <Skeleton />
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <button onClick={handleBack}>
          <Icons.Community.Create.ArrowBack />
        </button>
        <h2 className={styles.title}>
          {currentCommunity?.name}
        </h2>
      </div>
      <div className={styles.content}>
        <h3 className={styles.subtitle}>
          Who can post on this community
        </h3>
        <p className={styles.description}>
          You can control who can create posts in your community.
        </p>
        <Form className={styles.form}>
          <Form.Item className={styles.formItem}>
            <RadioAntd.Group
              vertical
              className={styles.radio}
              options={[
                {
                  value: 1,
                  label: <div className={styles.radioItem}>Everyone can post</div>
                },
                {
                  value: 2,
                  label:
                    <div className={styles.radioItem}>Admin review post</div>
                },
                {
                  value: 3,
                  label:
                    <div className={styles.radioItem}>Only admins can post</div>
                },
              ]}
            />
          </Form.Item>
          <Form.Item className={styles.formItem}>
            <Button variant="primary" htmlType="submit" loading={isLoading} className={styles.button}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default memo(Community)