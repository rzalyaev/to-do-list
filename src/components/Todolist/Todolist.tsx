import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {TaskType, FilterType} from '../../App';
import {Button} from "../common/Button";

type PropsType = {
    title: string
    tasks: TaskType[]
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
}

export const Todolist: React.FC<PropsType> = (props) => {
    const [filter, setFilter] = useState<FilterType>('all')

    const filterContainer = () => {
        let currentTasks = props.tasks;

        if (filter === 'active') {
            currentTasks = props.tasks.filter(el => !el.isDone);
        }
        if (filter === 'completed') {
            currentTasks = props.tasks.filter(el => el.isDone);
        }
        return currentTasks;
    }

    const filterTasks = (filterMethod: FilterType) => {
        setFilter(filterMethod);
    }

    const filterAllHandler = () => {
        filterTasks('all');
    }

    const filterActiveHandler = () => {
        filterTasks('active');
    }

    const filterCompletedHandler = () => {
        filterTasks('completed');
    }

    let [title, setTitle] = useState('');

    const onChangeAddTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const onClickAddTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title);
            setTitle('');
        }
    }

    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTaskHandler();
        }
    }

    const tasksElements = filterContainer().map((task) => {
        const onClickRemoveTaskHandler = () => {
            props.removeTask(task.id);
        }

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeTaskStatus(task.id, newIsDoneValue);
        }

        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                <span>{task.title}</span>
                <Button name={'X'} callBack={onClickRemoveTaskHandler}/>
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeAddTaskHandler}
                       onKeyDown={onKeyDownAddTaskHandler}/>
                <Button name={'+'} callBack={onClickAddTaskHandler}/>
            </div>
            <ul>
                {tasksElements}
            </ul>
            <div>
                <Button name={'All'} callBack={filterAllHandler}/>
                <Button name={'Active'} callBack={filterActiveHandler}/>
                <Button name={'Completed'} callBack={filterCompletedHandler}/>
            </div>
        </div>
    )
}