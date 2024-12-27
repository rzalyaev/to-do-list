import React from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    className?: string;
}

export const Input: React.FC<InputProps> = ({
                                         type = 'text',
                                         value,
                                         onChange,
                                         placeholder,
                                         name,
                                         id,
                                         disabled = false,
                                         readOnly = false,
                                         required = false,
                                         autoFocus = false,
                                         error,
                                         className,
                                         ...props
                                     }) => {
    return (
        <div className={`${styles.container} ${className}`}>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                name={name}
                id={id}
                disabled={disabled}
                readOnly={readOnly}
                required={required}
                autoFocus={autoFocus}
                {...props}
            />
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};
