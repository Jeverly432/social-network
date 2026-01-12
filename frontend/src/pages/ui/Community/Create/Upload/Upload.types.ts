import type { GetProp, UploadProps } from "antd";

export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export interface IUploadComponentProps {
  onFileChange?: (file: File) => void;
}