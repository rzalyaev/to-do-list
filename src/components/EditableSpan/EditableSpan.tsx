import React, {ChangeEvent, useState} from 'react';
import {TextField, Typography} from "@mui/material";

type EditableSpanPropsType = {
  initialTitle: string
  handleOnBlur: (title: string) => void
}

export const EditableSpan = ({initialTitle, handleOnBlur}: EditableSpanPropsType) => {
  const [changeMode, setChangeMode] = useState<boolean>(false);
  const [currentTitle, setCurrentTitle] = useState<string>(initialTitle);

  const changeCurrentTitle = (event: ChangeEvent<HTMLInputElement>) => setCurrentTitle(event.currentTarget.value);
  const toggleChangeMode = () => setChangeMode(true);
  const changeTaskTitle = () => {
    handleOnBlur(currentTitle);
    setChangeMode(false);
  }

  if (changeMode) {
    return (
        <TextField id="outlined-basic"
                   variant="outlined"
                   size={'small'}
                   value={currentTitle}
                   onChange={changeCurrentTitle}
                   onBlur={changeTaskTitle}
                   autoFocus={true}
                   sx={{flexGrow: 1}}
        />
    )
  } else {
    return (
        <Typography variant={'h6'}
                    onDoubleClick={toggleChangeMode}
                    sx={{flexGrow: 1, display: 'flex', alignItems: 'center'}}
        >
          {initialTitle}
        </Typography>
    )
  }
};