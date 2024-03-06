import React from 'react';
import styles from './AddItemForm.module.css';
import {Input, InputPropsType} from "../Input/Input";
import {Button, ButtonPropsType} from "../Button/Button";

type AddItemFormPropsType = InputPropsType & ButtonPropsType & {
  errorStatus: string
  className?: string
}

export const AddItemForm = ({
                              value, onChangeHandler, onKeyUpHandler, placeholder, inputClassName,
                              title, onClickHandler,  errorStatus, buttonClassName,
                              className
}: AddItemFormPropsType) => {
  const addItemFormClassName: string = `${styles.addItemForm} ${className ? className : ''}`
  return (
      <div className={addItemFormClassName}>
        <div className={styles.inputAndButton}>
          <Input type={'text'}
                 value={value}
                 onChangeHandler={onChangeHandler}
                 onKeyUpHandler={onKeyUpHandler}
                 placeholder={placeholder}
                 inputClassName={inputClassName}
          />
          <Button title={title}
                  onClickHandler={onClickHandler}
                  buttonClassName={styles.button}
          />
        </div>
        <div className={styles.error}>{errorStatus}</div>
      </div>
  );
};