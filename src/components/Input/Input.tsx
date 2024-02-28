import React, {ChangeEvent, KeyboardEvent} from 'react';

type InputPropsType = {
  type: string
  value?: string
  checked?: boolean
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void
  onKeyUpHandler?: (event: KeyboardEvent<HTMLInputElement>) => void
}

export const Input = ({type, value, checked, onChangeHandler, onKeyUpHandler}: InputPropsType) => {
  return (
      <input type={type}
             value={value}
             onChange={onChangeHandler}
             checked={checked} onKeyDown={onKeyUpHandler}
      />
  );
};