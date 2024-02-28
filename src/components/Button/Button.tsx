import React from 'react';

type ButtonType = {
  title: string
  onClick?: () => void
  disabled?: boolean
}

export const Button = ({title, onClick, disabled}: ButtonType) => {
  return (
      <button onClick={onClick} disabled={disabled}>{title}</button>
  );
};