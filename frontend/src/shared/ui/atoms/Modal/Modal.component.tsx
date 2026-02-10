import { Modal as ModalAnt } from "antd"
import type { IModalProps } from "./Modal.types"

export const Modal = ({ children, ...props }: IModalProps) => {
  return (
    <ModalAnt {...props}>
      {children}
    </ModalAnt>
  )
}