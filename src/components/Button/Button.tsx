import React from "react";
import styles from './Button.module.css';

type ButtonProps = {
    title: string
    onClick?: () => void;
    className?: string
}

export const Button = ({title, onClick, className}: ButtonProps) => {
    const buttonClassName = className + ' ' + styles.button;

    return <button onClick={onClick} className={buttonClassName}>{title}</button>
}