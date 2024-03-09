import React, {ChangeEvent, useState} from 'react';
import {TextField, Typography} from "@mui/material";

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
        <TextField id="outlined-basic"
                   variant="outlined"
                   size={'small'}
                   value={currentTitle}
                   onChange={handleChangeCurrentTitle}
                   onBlur={handleChangeTaskTitle}
                   autoFocus={true}
                   sx={{flexGrow: 1}}
        />
    )
  } else {
    return (
        <span onDoubleClick={handleToggleChangeMode}>{initialTitle}</span>
    )
  }
};