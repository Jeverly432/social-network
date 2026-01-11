import { message, Upload, type UploadProps } from "antd"
import { useState } from "react"
import styles from "./Upload.module.scss"
import { Icons } from "@shared/assets";
import { useDispatch } from "react-redux";
import { setUploadAvatar } from "@app/store/community/community.slice";
import type { FileType } from "./Upload.types";

export const UploadComponent = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const dispatch = useDispatch()

  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    const file = info.file.originFileObj as FileType;
    dispatch(setUploadAvatar(file))
    getBase64(file, (url) => {
      setLoading(false);
      setImageUrl(url);
    });
  };

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? "Загрузка" : <Icons.Community.Create.Photo />}
    </button>
  );


  return (
    <Upload
      name="avatar"
      listType="picture-circle"
      className={styles.upload}
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      customRequest={() => { }}
    >
      {imageUrl ? (
        <img draggable={false} src={imageUrl} alt="avatar" style={{ width: '100%' }} />
      ) : (
        uploadButton
      )}
    </Upload>
  )
}