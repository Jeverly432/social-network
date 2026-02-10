import type { RootState } from "@app/store/root.types"
import { Button, Input } from "@shared/ui"
import { useDispatch, useSelector } from "react-redux"
import styles from "../AuthModal.module.scss"
import { useEffect, useState, type ChangeEvent } from "react"
import { postLoginUserAction } from "@middleware/user/user.saga"
import { Form, Alert } from "antd"
import { emailRules, passwordRules } from "./LoginModal.data"
import { setError } from "@app/store/login/login.slice"

interface ILoginModal {
  setStateModal: VoidFunction
}

export const LoginModal = ({ setStateModal }: ILoginModal) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isOpen = useSelector((state: RootState) => state.login.isOpen)
  const [form] = Form.useForm()
  const isLoading = useSelector((state: RootState) => state.login.isLoading)
  const error = useSelector((state: RootState) => state.login.error)

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
    console.log(isLoading)
  }, [isLoading])

  useEffect(() => {
    form.resetFields()
    dispatch(setError(null))
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
      <Form.Item rules={passwordRules} validateTrigger="onBlur" name="name">
          <Input placeholder="Name" size="s" value={email} onChange={handleEmailChange} />
        </Form.Item>
        <Form.Item rules={emailRules} validateTrigger="onBlur" name="email">
          <Input placeholder="Email" size="s" value={email} onChange={handleEmailChange} />
        </Form.Item>
        <Form.Item rules={passwordRules} validateTrigger="onBlur" name="password">
          <Input placeholder="Password" size="s" value={password} onChange={handlePasswordChange} />
        </Form.Item>
      </div>
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          closable
          onClose={() => dispatch(setError(null))}
          className={styles.error}
        />
      )}
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