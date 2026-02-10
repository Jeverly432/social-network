import type { Rule } from "antd/es/form";

export const emailRules: Rule[] = [
  { required: true, message: 'Email is required' },
  {
    pattern: /^[a-zA-Z0-9\s\-_]+$/,
    message: 'Email can only contain letters, numbers, spaces, hyphens and underscores'
  }
]

export const passwordRules: Rule[] = [
  { required: true, message: 'Password is required' },
  { min: 3, message: 'Name must be at least 3 characters' },
  { max: 30, message: 'Name must be less than 30 characters' },
  {
    pattern: /^[a-zA-Z0-9\s\-_]+$/,
    message: 'Name can only contain letters, numbers, spaces, hyphens and underscores'
  }
]

const modalData = [
  {
    title: "Login",
    inputs: [
      {
        name: "email",
        rules: emailRules,
      }
    ]
  },
  {

  }
]