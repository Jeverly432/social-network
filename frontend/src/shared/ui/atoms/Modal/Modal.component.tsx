import { Modal as ModalAnt } from "antd"
import type { IModalProps } from "./Modal.types"

export const Modal = ({
  children,
  footer = null,
  ...props
}: IModalProps) => {
  return (
    <ModalAnt {...props} footer={footer}>
      {children}
    </ModalAnt>
  )
}