import { Input } from "../Input/Input.component"
import type { IInputProps } from "../Input/Input.types"
import styles from "./InputLabel.module.scss"

interface IInputLabelProps extends IInputProps {
  title: string
}

export const InputLabel = ({ title, ...props }: IInputLabelProps) => {
  return (
    <div>
      <h3 className={styles.title}>
        {title}
      </h3>
      <Input {...props} className={styles.inputCustom}/>
    </div>
  )
}