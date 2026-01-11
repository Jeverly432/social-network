import { Select as SelectAntd } from "antd"
import styles from "./Select.module.scss"
import cn from "classnames"
import type { ISelectProps } from "./Select.types"

export const Select = ({ size, ...props }: ISelectProps) => {
  return (
    <SelectAntd 
      {...props} 
      size={size} 
      className={cn(styles.select, styles[size])} 
      popupClassName={styles.selectDropdown}
    />
  )
}