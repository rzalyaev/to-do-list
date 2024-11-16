import React from 'react';
import {Task, TaskList} from "../App";
import {Button} from "./Button";

type Props = {
    title: string
    tasks: TaskList
    date?: string
}

export const ToDoList = ({title, tasks, date}: Props) => {
    const mappedTasks = tasks.map((task: Task) => {
        return <li key={task.id}><input type="checkbox" checked={task.isDone}/> <span>{task.title}</span></li>
    })

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={'+'}/>
            </div>
            {mappedTasks.length === 0
                ? <p>
                    There are no tasks yet.
                </p>
                : <ul>
                    {mappedTasks}
                </ul>}
            <div className='buttons-container'>
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>
            </div>
            <div>{date}</div>
        </div>
    );
};