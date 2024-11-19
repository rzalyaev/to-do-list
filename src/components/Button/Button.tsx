import React from "react";
import styles from './Button.module.css';

type Props = {
    title: string
    onClick?: () => void;
    className?: string
}

export const Button = ({title, onClick, className}: Props) => {
    const buttonClassName = className + ' ' + styles.button;

    return <button onClick={onClick} className={buttonClassName}>{title}</button>
}