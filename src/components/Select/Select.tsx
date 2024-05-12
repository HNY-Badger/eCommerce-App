import React, { ChangeEventHandler } from 'react';
import * as styles from './Select.module.css';

export type Option = {
  text: string;
  value: string;
};

type Props = {
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  label: string;
  id: string;
  options: Option[];
};

function Select({ value, onChange, id, label, options }: Props) {
  return (
    <div className={styles.select_wrapper}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <select value={value} onChange={onChange} id={id} className={styles.select}>
        {options.map((option) => (
          <option key={option.value} className={styles.option} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;