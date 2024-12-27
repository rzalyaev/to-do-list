import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import styles from './AddItemForm.module.css';
import {Input} from "../Input/Input";
import {Button} from "../Button/Button";

type AddItemFormProps = {
    addItem: (itemText: string) => void
}

export const AddItemForm = ({addItem}: AddItemFormProps) => {
    const [currentInputText, setCurrentInputText] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        currentInputText.trim() && setError(false);
    }, [currentInputText]);

    const handleInputText = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentInputText(e.currentTarget.value);
    }

    const handleAddItem = () => {
        if (currentInputText.trim()) {
            addItem(currentInputText);
            setCurrentInputText('');
        } else {
            setError(true);
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
                       className={styles.input}
                />
                <Button title={'+'}
                        onClick={handleAddItem}
                        className={styles.button}
                />
            </div>
            {error ? <span className={'error'}>Invalid value!</span> : ''}
        </div>
    );
};