import React, {ChangeEvent, KeyboardEvent} from 'react';
import styles from './Input.module.css';

export type InputPropsType = {
  type: string
  value?: string
  checked?: boolean
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void
  onKeyUpHandler?: (event: KeyboardEvent<HTMLInputElement>) => void
  onBlurHandler?: () => void
  inputClassName?: string
  placeholder?: string
}

export const Input = ({
                        type, value, checked, onChangeHandler, onKeyUpHandler, onBlurHandler, inputClassName, placeholder
}: InputPropsType) => {
  const inputFinalClassName: string = `${styles.input} ${inputClassName ? inputClassName : ''}`;

  return (
      <input type={type}
             value={value}
             checked={checked}
             onChange={onChangeHandler}
             onKeyUp={onKeyUpHandler}
             onBlur={onBlurHandler}
             className={inputFinalClassName}
             placeholder={placeholder}
             autoFocus={true}
      />
  );
};