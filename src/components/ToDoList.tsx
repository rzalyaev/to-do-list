import React, {ChangeEvent} from 'react';
import styles from './ToDoList.module.css';
import {filterMethodType, Task, TaskList} from "../App";
import {Button} from "./Button/Button";
import {AddItemForm} from "./AddItemForm/AddItemForm";

type Props = {
    title: string
    tasks: TaskList
    addTask: (newTaskTitle: string) => void
    deleteTask: (id: string) => void
    filterMethod: filterMethodType
    changeFilterMethod: (reqFilterMethod: filterMethodType) => void
    changeTaskCompletion: (id: string, newTaskCompletionValue: boolean) => void
    error?: string | null
    createError: (newError: string) => void
    date?: string
}

export const ToDoList = ({
                             title,
                             tasks,
                             addTask,
                             deleteTask,
                             filterMethod,
                             changeFilterMethod,
                             changeTaskCompletion,
                             error,
                             createError,
                             date
                         }: Props) => {
    const mappedTasks = tasks.map(({id, title, isDone}: Task) => {
        const handleTaskDeletion = () => deleteTask(id);
        const handleTaskCompletion = (e: ChangeEvent<HTMLInputElement>) => {
            const newTaskCompletionValue = e.currentTarget.checked;
            changeTaskCompletion(id, newTaskCompletionValue);
        }
        return (
            <li key={id} className={styles.taskListItem}>
                <div>
                    <input type="checkbox" checked={isDone} onChange={handleTaskCompletion}/>
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

    const allFilterButtonClassName = filterMethod === 'all'
        ? styles.filterButton + ' ' + styles.activeFilterButton
        : styles.filterButton;
    const activeFilterButtonClassName = filterMethod === 'active'
        ? styles.filterButton + ' ' + styles.activeFilterButton
        : styles.filterButton;
    const completedFilterButtonClassName = filterMethod === 'completed'
        ? styles.filterButton + ' ' + styles.activeFilterButton
        : styles.filterButton;

    return (
        <div>
            <h3 className={styles.toDoListHeader}>{title}</h3>
            <AddItemForm addItem={addTask} error={error} createError={createError}/>
            {
                mappedTasks.length === 0
                    ? <p>There are no tasks yet.</p>
                    : <ul className={styles.taskList}>{mappedTasks}</ul>
            }
            <div className='buttons-container'>
                <Button title={'All'} onClick={showAllTasks} className={allFilterButtonClassName}/>
                <Button title={'Active'} onClick={showActiveTasks} className={activeFilterButtonClassName}/>
                <Button title={'Completed'} onClick={showCompletedTasks} className={completedFilterButtonClassName}/>
            </div>
            <div>{date}</div>
        </div>
    );
};