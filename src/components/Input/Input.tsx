import React, {ChangeEvent, KeyboardEvent} from 'react';
import styles from './Input.module.css';

type InputPropsType = {
  type: string
  value?: string
  checked?: boolean
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void
  onKeyUpHandler?: (event: KeyboardEvent<HTMLInputElement>) => void
  className?: string
  placeholder?: string
}

export const Input = ({type, value, checked, onChangeHandler, onKeyUpHandler, className, placeholder}: InputPropsType) => {
  const inputClassName: string = `${styles.input} ${className ? className : ''}`;

  return (
      <input type={type}
             value={value}
             onChange={onChangeHandler}
             checked={checked} onKeyDown={onKeyUpHandler}
             className={inputClassName}
             placeholder={placeholder}
      />
  );
};