import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import styles from './Todolist.module.css';
import {TaskType, FilterType} from '../../App';
import {Button} from "../common/Button";

type PropsType = {
     id: string
    title: string
    filter: FilterType
    tasks: TaskType[]
    removeTodolist: (todolistId: string) => void
    changeFilter: (todolistId: string, filterMethod: FilterType) => void
    addTask: (todolistId: string, title: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
}

export const Todolist: React.FC<PropsType> = (props) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string>('')

    const handleOnClickRemoveTodolist = () => {
        props.removeTodolist(props.id);
    }

    const filterTasks = (filterMethod: FilterType) => props.changeFilter(props.id, filterMethod);

    const filterAllHandler = () => filterTasks('all');
    const filterActiveHandler = () => filterTasks('active');
    const filterCompletedHandler = () => filterTasks('completed');

    const onChangeAddTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('');
        setTitle(e.currentTarget.value);
    }

    const onClickAddTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(props.id, title.trim());
            setTitle('');
        } else {
            setError('Ошибка! Введите текст!')
        }
    }

    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTaskHandler();
        }
    }

    const onChangeHandler = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.id, taskId, newIsDoneValue);
    }

    const tasksElements = props.tasks.map((task) => {
        const onClickRemoveTaskHandler = () => {
            props.removeTask(props.id, task.id);
        }

        return (
            <li key={task.id} className={task.isDone ? styles.isDone : ''}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeHandler(task.id, e)}
                />
                <span>{task.title}</span>
                <Button name={'X'} callBack={onClickRemoveTaskHandler}/>
            </li>
        )
    });

    return (
        <div>
            <h3>{props.title}<button onClick={handleOnClickRemoveTodolist}>X</button></h3>
            <div>
                <input className={error && styles.errorInput}
                       value={title}
                       onChange={onChangeAddTaskHandler}
                       onKeyDown={onKeyDownAddTaskHandler}
                />
                <Button name={'+'}
                        callBack={onClickAddTaskHandler}
                />
            </div>
            {error && <div className={styles.errorMessage}>{error}</div>}
            <ul>
                {tasksElements}
            </ul>
            <div>
                <Button className={props.filter === 'all' ? styles.activeFilter : ''}
                        name={'All'}
                        callBack={filterAllHandler}
                />
                <Button className={props.filter === 'active' ? styles.activeFilter : ''}
                        name={'Active'}
                        callBack={filterActiveHandler}
                />
                <Button className={props.filter === 'completed' ? styles.activeFilter : ''}
                        name={'Completed'}
                        callBack={filterCompletedHandler}
                />
            </div>
        </div>
    )
}