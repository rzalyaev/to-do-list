import React from "react";

type TodolistPropsType = {
    header: string,
    track?: number | boolean,
    tasks: TaskType[]
}

type TaskType={
    id: number,
    title: string,
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    return (
        <div className="App">
            <div>
                <h3>{props.header}</h3>
                <div>
                    <input/>
                    <button className="button">+</button>
                </div>
                <ul>
                    {props.tasks.map(e => {
                        return(
                            <li><input type="checkbox" checked={e.isDone}/> <span>{e.title}</span></li>
                        )
                    })}
                </ul>
                <div>
                    <button className="button">All</button>
                    <button className="button">Active</button>
                    <button className="button">Completed</button>
                </div>
            </div>
        </div>
    )
}