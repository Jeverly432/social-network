import type { Rule } from "antd/es/form";

export const emailRules: Rule[] = [
  { required: true, message: 'Email is required' },
  { type: 'email', message: 'Please enter a valid email' }
]

export const userNameRules: Rule[] = [
  { required: true, message: 'Username is required' },
  { min: 3, message: 'Username must be at least 3 characters' },
  { max: 30, message: 'Username must be less than 30 characters' },
  {
    pattern: /^[a-zA-Z0-9\s\-_]+$/,
    message: 'Username can only contain letters, numbers, spaces, hyphens and underscores'
  }
]

export const passwordRules: Rule[] = [
  { required: true, message: 'Password is required' },
  { min: 4, message: 'Password must be at least 4 characters' },
  { max: 10, message: 'Password must be less than 10 characters' }
]
