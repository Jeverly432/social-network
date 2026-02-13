import type { RootState } from "@app/store/root.types"
import { Button, Input } from "@shared/ui"
import { useDispatch, useSelector } from "react-redux"
import styles from "../AuthModal.module.scss"
import { useEffect, useState, type ChangeEvent } from "react"
import { postLoginUserAction } from "@middleware/user/user.saga"
import { Form } from "antd"
import { passwordRules } from "./LoginModal.data"
import type { ILoginModal } from "./LoginModal.types"

export const LoginModal = ({ setStateModal }: ILoginModal) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isOpen = useSelector((state: RootState) => state.auth.isOpen)
  const [form] = Form.useForm()
  const isLoading = useSelector((state: RootState) => state.auth.isLoading)

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleLogin = () => {
    dispatch(postLoginUserAction({
      email,
      password
    }));
  };

  useEffect(() => {
    form.resetFields()
  }, [isOpen, dispatch, form])

  return (
    <Form
      className={styles.form}
      onFinish={handleLogin}
    >
      <h2>
        Login
      </h2>
      <p>
        Enter your account details
      </p>
      <div className={styles.inputs}>
        <Form.Item validateTrigger="onBlur" name="email">
          <Input placeholder="Email" size="s" value={email} onChange={handleEmailChange} />
        </Form.Item>
        <Form.Item rules={passwordRules} validateTrigger="onBlur" name="password">
          <Input placeholder="Password" size="s" type="password" value={password} onChange={handlePasswordChange} />
        </Form.Item>
      </div>
      <Form.Item>
        <Button variant="primary" className={styles.button} loading={isLoading} htmlType="submit">
          Login
        </Button>
      </Form.Item>
      <div className={styles.footer}>
        <span>
          Don't have an account?
        </span>
        <Button size="s" variant="secondary" htmlType="submit" onClick={() => setStateModal()}>
          Sign up
        </Button>
      </div>
    </Form>
  )
}