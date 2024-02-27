import React, {ChangeEvent} from 'react';

type InputPropsType = {
  type: string
  value?: string
  checked?: boolean
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({type, value, onChangeHandler, checked}: InputPropsType) => {
  return (
      <input type={type} value={value} onChange={onChangeHandler} checked={checked}/>
  );
};