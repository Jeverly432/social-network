import type { RadioChangeEvent } from 'antd';
import { Radio as RadioAntd } from 'antd';
import { Item } from './Item/Item.component';
import { Icons } from '@shared/assets';
import styles from "./Radio.module.scss"

interface IRadioProps {
  value?: number;
  onChange?: (value: number) => void;
}

export const Radio = ({ value, onChange }: IRadioProps) => {
  const handleChange = (e: RadioChangeEvent) => {
    onChange?.(e.target.value);
  };

  return (
    <RadioAntd.Group
      vertical
      onChange={handleChange}
      value={value}
      className={styles.radio}
      options={[
        {
          value: 1,
          label:
            <Item title='Public' description='Anyone can join, view, and search the posts in this community.' icon={<Icons.Community.Create.Public />} />
        },
        {
          value: 2,
          label:
            <Item title='Private' description='Only members invited by the moderators can join, view, and search the posts in this community.' icon={<Icons.Community.Create.Private />} />
        },
      ]}
    />
  )
}