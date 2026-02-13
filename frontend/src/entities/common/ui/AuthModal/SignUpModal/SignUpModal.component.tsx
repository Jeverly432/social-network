import type { RootState } from "@app/store/root.types"
import { Button, Input } from "@shared/ui"
import { useDispatch, useSelector } from "react-redux"
import styles from "../AuthModal.module.scss"
import { useEffect, useState, type ChangeEvent } from "react"
import { postRegisterUserAction } from "@middleware/user/user.saga"
import { Form } from "antd"
import { emailRules, passwordRules, userNameRules } from "./SignUpModal.data"

import type { ISignUpModal } from "./SignUpModal.types"

export const SignUpModal = ({ setStateModal }: ISignUpModal) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("")
  const isOpen = useSelector((state: RootState) => state.auth.isOpen)
  const [form] = Form.useForm()
  const isLoading = useSelector((state: RootState) => state.auth.isLoading)

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleSignUp = () => {
    dispatch(postRegisterUserAction({
      email,
      password,
      userName: name
    }));
  };

  useEffect(() => {
    form.resetFields()
  }, [isOpen, dispatch, form])

  return (
    <Form
      className={styles.form}
      onFinish={handleSignUp}
    >
      <h2>
        Sign up
      </h2>
      <p>
        Enter your account details
      </p>
      <div className={styles.inputs}>
        <Form.Item rules={userNameRules} validateTrigger="onBlur" name="userName">
          <Input placeholder="Username" size="s" value={name} onChange={handleNameChange} />
        </Form.Item>
        <Form.Item rules={emailRules} validateTrigger="onBlur" name="email">
          <Input placeholder="Email" size="s" value={email} onChange={handleEmailChange} />
        </Form.Item>
        <Form.Item rules={passwordRules} validateTrigger="onBlur" name="password">
          <Input placeholder="Password" size="s" type="password" value={password} onChange={handlePasswordChange} />
        </Form.Item>
      </div>
      <Form.Item>
        <Button variant="primary" className={styles.button} loading={isLoading} htmlType="submit">
          Sign up
        </Button>
      </Form.Item>
      <div className={styles.footer}>
        <span>
          Already have an account?
        </span>
        <Button size="s" variant="secondary" htmlType="button" onClick={() => setStateModal()}>
          Login
        </Button>
      </div>
    </Form>
  )
}