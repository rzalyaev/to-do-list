import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Input from '../Input/Input';

type PropsType = {
    value: string
    changeBody: (title: string) => void
}

const EditableSpan = ({value, changeBody}: PropsType) => {
    const [inputBody, setInputBody] = useState<string>(value);
    const [editMode, setEditMode] = useState<boolean>(false);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => setInputBody(e.currentTarget.value);
    const handleOnBlur = () => {
        changeBody(inputBody);
        setEditMode(false);
    }

    const handleEnterKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleOnBlur();
        }
    }

    const handleDoubleClick = () => setEditMode(true);

    return (
        editMode
            ? <Input value={inputBody}
                     onChange={handleOnChange}
                     onBlur={handleOnBlur}
                     onKeyDown={handleEnterKeyDown}
                     autoFocus={true}
            />
            : <span onDoubleClick={handleDoubleClick}>{value}</span>
    );
};

export default EditableSpan;