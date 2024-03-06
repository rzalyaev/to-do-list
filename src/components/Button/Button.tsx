import React from 'react';

export type ButtonPropsType = {
  title: string
  onClickHandler?: () => void
  disabled?: boolean
  buttonClassName?: string
  errorHandler?: () => void
}

export const Button = ({title, onClickHandler, disabled, buttonClassName}: ButtonPropsType) => {
  return (
      <button onClick={onClickHandler}
              disabled={disabled}
              className={buttonClassName}
      >
        {title}
      </button>
  );
};