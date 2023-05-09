import React from "react";

type PropsType = {
    name: string
    callBack: () => void
}

export const Button: React.FC<PropsType> = (props) => {
    const onClickHandler = () => props.callBack();

    return (
        <button onClick={onClickHandler}>{props.name}</button>
    )
}