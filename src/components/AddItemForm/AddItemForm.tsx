import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import styles from './AddItemForm.module.css';
import {Input} from "../Input/Input";
import {Button} from "../Button/Button";

type AddItemFormProps = {
    addItem: (itemText: string) => void
    error: string
    createError: (error: string) => void
}

export const AddItemForm = ({addItem, error, createError}: AddItemFormProps) => {
    const [currentInputText, setCurrentInputText] = useState<string>('');

    useEffect(() => {
        currentInputText.trim() && createError('');
    }, [currentInputText]);

    const handleInputText = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentInputText(e.currentTarget.value);
    }

    const handleAddItem = () => {
        if (currentInputText.trim()) {
            addItem(currentInputText);
            setCurrentInputText('');
        } else {
            createError('title is required');
        }
    }

    const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && handleAddItem();
    }

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <Input type={'text'}
                       value={currentInputText}
                       onChange={handleInputText}
                       onKeyUp={handleKeyUp}
                />
                <Button title={'+'}
                        onClick={handleAddItem}
                />
            </div>
            {error ? <span className={'error'}>{error}</span> : ''}
        </div>
    );
};