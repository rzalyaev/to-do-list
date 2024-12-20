import React, {InputHTMLAttributes} from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {

}

export const Input = ({type, value, checked, onChange, onKeyUp}: InputProps) => {
    return (
        <input type={type}
               value={value}
               checked={checked}
               onChange={onChange}
               onKeyUp={onKeyUp}
        />
    );
};