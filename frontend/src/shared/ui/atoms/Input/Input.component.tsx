import { Input as InputAnt } from "antd"
import type { IInputProps } from "./Input.types"
import cn from 'classnames';
import style from "./Input.module.scss"

export const Input = ({ size = "m", variant = "square", className, status, ...props }: IInputProps) => {
  return (
    <InputAnt {...props} className={cn(style.input, style[size], style[variant], status && style[status], className)} allowClear status={status} />
  )
}