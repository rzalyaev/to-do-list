import React from 'react';

type ButtonType = {
  title: string
  onClick?: () => void
  disabled?: boolean
  className?: string
  errorHandler?: () => void
}

export const Button = ({title, onClickHandler, disabled, className}: ButtonType) => {
  return (
      <button onClick={onClickHandler} disabled={disabled} className={className}>{title}</button>
  );
};