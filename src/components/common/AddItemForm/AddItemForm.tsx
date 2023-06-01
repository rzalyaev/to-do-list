import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from './AddItemForm.module.css';
import Input from '../Input/Input';
import Button from '../Button';

type PropsType = {
    addItem: (itemTitle: string) => void
}

const AddItemForm = ({addItem} :PropsType) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string>('');

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError('');
        setTitle(e.currentTarget.value);
    }

    const handleOnClick = () => {
        if (title.trim() !== '') {
            addItem(title.trim());
            setTitle('');
        } else {
            setError('Ошибка! Введите текст!');
        }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleOnClick();
        }
    }

    return (
        <div>
            <Input
                value={title}
                onChange={handleOnChange}
                onKeyDown={handleKeyDown}
                error={error}
            />
            <Button
                name={'+'}
                callBack={handleOnClick}
            />
        </div>
    );
};

export default AddItemForm;