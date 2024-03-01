import React, {ChangeEvent, KeyboardEvent} from 'react';

type InputPropsType = {
  type: string
  value?: string
  checked?: boolean
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void
  onKeyUpHandler?: (event: KeyboardEvent<HTMLInputElement>) => void
  className?: string
}

export const Input = ({type, value, checked, onChangeHandler, onKeyUpHandler, className}: InputPropsType) => {
  return (
      <input type={type}
             value={value}
             onChange={onChangeHandler}
             checked={checked} onKeyDown={onKeyUpHandler}
             className={className}
      />
  );
};