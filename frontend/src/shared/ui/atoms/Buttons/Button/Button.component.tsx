import { Button as AntButton } from "antd"
import type { IButtonProps } from "./Button.types"
import cn from 'classnames';
import styles from './Button.module.scss';

export const Button = ({
  children, variant = "primary", className, size = "l", isIcon = false, ...props
}: IButtonProps) => {
  return (
    <AntButton
      {...props}
      className={cn(
        styles.button, 
        styles[variant], 
        styles[size], 
        isIcon && styles.isIcon, 
        className
      )}
    >
      {children}
    </AntButton>
  )
}