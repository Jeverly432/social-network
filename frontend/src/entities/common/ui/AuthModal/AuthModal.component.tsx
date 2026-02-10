import { useState } from "react"
import { LoginModal } from "./LoginModal/LoginModal.component"
import { SignUpModal } from "./SignUpModal/SignUpModal.component"
import styles from "./AuthModal.module.scss"
import { Modal } from "@shared/ui"
import Background from "@shared/assets/images/image/login.webp"
import People from "@shared/assets/images/image/people.webp"
import type { RootState } from "@app/store/root.types"
import { useSelector } from "react-redux"

type ModalState = "login" | "signup"

export const AuthModal = () => {
  const [stateModal, setStateModal] = useState<ModalState>("login")
  const isOpen = useSelector((state: RootState) => state.auth.isOpen)

  return (
    <Modal open={isOpen} wrapClassName={styles.modal} footer={false} closeIcon={false} mask={{ blur: false }} centered={true}>
      <div className={styles.content}>
        {stateModal === "login" ? (
          <LoginModal setStateModal={() => setStateModal("signup")} />
        ) : (
          <SignUpModal setStateModal={() => setStateModal("login")} />
        )}
        <div className={styles.banner}>
          <div className={styles.title}>
            <p>
              Welcome to
            </p>
            <span>
              social network
            </span>
          </div>
          <img src={Background} alt="background" className={styles.image} />
          <div className={styles.people}>
            <img src={People} alt="people" />
          </div>
        </div>
      </div>
    </Modal>
  )
}