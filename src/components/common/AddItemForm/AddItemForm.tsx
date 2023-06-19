import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from './AddItemForm.module.css';
import {IconButton, TextField} from '@mui/material';
import {AddBox} from "@mui/icons-material";

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
            <TextField
                value={title}
                onChange={handleOnChange}
                onKeyDown={handleKeyDown}
                error={!!error}
                helperText={error}
                size={'small'}
            />
            <IconButton
                color={'primary'}
                onClick={handleOnClick}>
                <AddBox/>
            </IconButton>
        </div>
    );
};

export default AddItemForm;