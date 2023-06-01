import React from 'react';

type PropsType = {
    className?: string
    name: string
    callBack: () => void
}

const Button: React.FC<PropsType> = (props) => {
    const onClickHandler = () => props.callBack();

    return (
        <button className={props.className} onClick={onClickHandler}>{props.name}</button>
    );
};

export default Button;