import React, {ChangeEvent, useState} from 'react';
import styles from './EditableSpan.module.css';
import {Input} from "../Input/Input";

type EditableSpanProps = {
    children: string
    onChange: (value: string) => void
    className?: string
}

export const EditableSpan = ({children, onChange, className}: EditableSpanProps) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [currentValue, setCurrentValue] = useState<string>(children);
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setCurrentValue(e.currentTarget.value);
    const handleInputBlur = () => {
        onChange(currentValue);
        setEditMode(false);
    }
    const handleSpanDoubleClick = () => setEditMode(true);
    return (
        <div className={`${styles.container} ${className}`}>
            {editMode
                ? <Input value={currentValue} onChange={handleInputChange} onBlur={handleInputBlur} autoFocus={true}
                         className={styles.input}/>
                : <span onDoubleClick={handleSpanDoubleClick}>{children}</span>
            }
        </div>
    );
};