import React, {memo} from 'react';
import styles from './AddItemForm.module.css';
import {InputPropsType} from "../Input/Input";
import {ButtonPropsType} from "../Button/Button";
import {IconButton, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

type AddItemFormPropsType = InputPropsType & ButtonPropsType & {
  errorStatus: string
  className?: string
}

export const AddItemForm = memo(({
                              value, onChangeHandler, onKeyUpHandler, placeholder, onClickHandler,  errorStatus,
                              className
}: AddItemFormPropsType) => {
  const addItemFormClassName: string = `${styles.addItemForm} ${className ? className : ''}`
  return (
      <div className={addItemFormClassName}>
        <div className={styles.inputAndButton}>
          <TextField id="outlined-basic"
                     variant="outlined"
                     size={'small'}
                     value={value}
                     onChange={onChangeHandler}
                     onKeyUp={onKeyUpHandler}
                     placeholder={placeholder}
                     error={!!errorStatus}
          />
          <IconButton onClick={onClickHandler}>
            <AddIcon />
          </IconButton>
        </div>
        <div className={styles.error}>{errorStatus}</div>
      </div>
  );
});