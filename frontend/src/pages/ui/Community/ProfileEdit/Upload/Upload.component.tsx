import { message, Upload, type UploadProps } from "antd"
import { useState, useEffect } from "react"
import styles from "./Upload.module.scss"
import { Icons } from "@shared/assets";
import type { FileType, IUploadComponentProps } from "./Upload.types";

export const UploadComponent = ({ onFileChange, defaultImage }: IUploadComponentProps) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(defaultImage ? defaultImage : "");

  useEffect(() => {
    if (defaultImage && defaultImage !== imageUrl) {
      setImageUrl(defaultImage);
    }
  }, [defaultImage]);

  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    const file = info.file.originFileObj as FileType;

    if (file) {
      setLoading(true);
      getBase64(file, (url) => {
        setLoading(false);
        setImageUrl(url);
        onFileChange?.(file);
      });
    }
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
        <img draggable={false} src={imageUrl} alt="avatar" />
      ) : (
        uploadButton
      )}
    </Upload>
  )
}