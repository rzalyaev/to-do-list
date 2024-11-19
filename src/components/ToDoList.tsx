import React from 'react';
import styles from './ToDoList.module.css';
import {filterMethodType, Task, TaskList} from "../App";
import {Button} from "./Button/Button";

type Props = {
    title: string
    tasks: TaskList
    deleteTask: (id: number) => void
    changeFilterMethod: (reqFilterMethod: filterMethodType) => void
    date?: string
}

export const ToDoList = ({title, tasks, deleteTask, changeFilterMethod, date}: Props) => {
    const mappedTasks = tasks.map(({id, title, isDone}: Task) => {
        const handleTaskDeletion = () => deleteTask(id);

        return (
            <li key={id} className={styles.taskListItem}>
                <div>
                    <input type="checkbox" checked={isDone}/>
                    <span>{title}</span>
                </div>
                <Button title={'x'}
                        onClick={handleTaskDeletion}
                        className={styles.deleteButton}
                />
            </li>
        )
    });

    const showAllTasks = () => changeFilterMethod('all');
    const showActiveTasks = () => changeFilterMethod('active');
    const showCompletedTasks = () => changeFilterMethod('completed');

    return (
        <div>
            <div className={styles.toDoListHeader}>
                <h3>{title}</h3>
            </div>
            <div>
                <input/>
                <Button title={'+'}/>
            </div>
            {
                mappedTasks.length === 0
                ? <p>There are no tasks yet.</p>
                : <ul className={styles.taskList}>{mappedTasks}</ul>
            }
            <div className='buttons-container'>
                <Button title={'All'} onClick={showAllTasks}/>
                <Button title={'Active'} onClick={showActiveTasks}/>
                <Button title={'Completed'} onClick={showCompletedTasks}/>
            </div>
            <div>{date}</div>
        </div>
    );
};