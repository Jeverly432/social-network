import { memo } from "react"
import styles from "./Community.module.scss"
import { useNavigate } from "react-router-dom"
import { Icons } from "@shared/assets"
import { UploadComponent } from "./Upload/Upload.component"
import { InputLabel, Select } from "@shared/ui"
import { selectOptions } from "./Community.data"

const CommunityPage = () => {
  const navigate = useNavigate()
  
  const handleBack = () => {
    navigate(-1)
  }

  const suffix = (
    <div className={styles.suffix}>
      <Icons.Community.Create.ArrowDown />
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <button onClick={handleBack}>
          <Icons.Community.Create.ArrowBack />
        </button>
        <h2 className={styles.title}>
          Create community
        </h2>
      </div>
      <div className={styles.body}>
        <UploadComponent />
        <div className={styles.content}>
          <InputLabel title="Community name" placeholder="Name your community" maxLength={30} max={30} count={{ show: true }} />
          <InputLabel title="About" placeholder="Enter description " maxLength={180} max={180} count={{ show: true }} />
          <Select options={selectOptions} size="middle" placeholder="Select category" mode="multiple" suffix={suffix} />
        </div>
      </div>
    </div>
  )
}

export default memo(CommunityPage)