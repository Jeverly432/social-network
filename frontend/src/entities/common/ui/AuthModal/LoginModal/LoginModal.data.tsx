import type { Rule } from "antd/es/form";

export const emailRules: Rule[] = [
  { required: true, message: 'Email is required' },
  { type: 'email', message: 'Please enter a valid email' }
]

export const passwordRules: Rule[] = [
  { required: true, message: 'Password is required' }
]
