import React, {ChangeEvent, useState} from 'react';
import styles from './EditableSpan.module.css';
import {Input} from "../Input/Input";
import {TaskType} from "../../App";

type EditableSpanPropsType = {
  initialTitle: string
  handleOnBlur: (title: string) => void
}

export const EditableSpan = ({initialTitle, handleOnBlur}: EditableSpanPropsType) => {
  const [changeMode, setChangeMode] = useState<boolean>(false);
  const [currentTitle, setCurrentTitle] = useState<string>(initialTitle);

  const handleChangeCurrentTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(event.currentTarget.value)
  };
  const handleToggleChangeMode = () => setChangeMode(true);
  const handleChangeTaskTitle = () => {
    handleOnBlur(currentTitle);
    setChangeMode(false);
  }

  if (changeMode) {
    return (
        <Input type={'text'}
               value={currentTitle}
               onChangeHandler={handleChangeCurrentTitle}
               onBlurHandler={handleChangeTaskTitle}
               inputClassName={styles.input}
        />
    )
  } else {
    return (
        <span onDoubleClick={handleToggleChangeMode}>{initialTitle}</span>
    )
  }
};