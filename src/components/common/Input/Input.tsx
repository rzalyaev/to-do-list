import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react';
import styles from './Input.module.css';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type PropsType = DefaultInputPropsType & {
    value: string
    className?: string
    placeholder?: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    error?: string
}

const Input = ({error, ...restProps}: PropsType) => {
    return (
        <div className={styles.universalInput}>
            <input {...restProps}/>
            {error ? <span className={styles.errorMessage}>{error}</span> : ''}
        </div>
    );
};

export default Input;