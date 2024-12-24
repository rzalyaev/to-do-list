import React, {ChangeEvent} from 'react';
import styles from './ToDoList.module.css';
import {filterMethodType, Task} from "../App";
import {Button} from "./Button/Button";
import {AddItemForm} from "./AddItemForm/AddItemForm";

type Props = {
    id: string
    title: string
    error: string
    filterMethod: filterMethodType
    tasks: Task[]
    addTask: (toDoListId: string, title: string) => void
    deleteTask: (toDoListId: string, taskId: string) => void
    filterTasks: (tasks: Task[], filterMethod: filterMethodType) => Task[]
    changeFilterMethod: (toDoListId: string, filterMethod: filterMethodType) => void
    changeTaskCompletion: (toDoListId: string, taskId: string, newTaskCompletionValue: boolean) => void
    createError: (toDoListId: string, error: string) => void
    deleteToDoList: (toDoListId: string) => void
    date?: string
}

export const ToDoList = ({
                             id,
                             title,
                             filterMethod,
                             error,
                             tasks,
                             addTask,
                             deleteTask,
                             filterTasks,
                             changeFilterMethod,
                             changeTaskCompletion,
                             createError,
                             deleteToDoList,
                             date
                         }: Props) => {
    const mappedTasks = filterTasks(tasks, filterMethod).map(task => {
        const handleTaskDeletion = () => deleteTask(id, task.id);
        const handleTaskCompletion = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskCompletion(id, task.id, e.currentTarget.checked);
        }
        const itemClassName = `${styles.taskListItem} ${task.isDone ? styles.inactive : ''}`;
        return (
            <li key={id} className={itemClassName}>
                <div>
                    <input type="checkbox" checked={task.isDone} onChange={handleTaskCompletion}/>
                    <span>{task.title}</span>
                </div>
                <Button title={'x'}
                        onClick={handleTaskDeletion}
                        className={styles.deleteButton}
                />
            </li>
        )
    });

    const showAllTasks = () => changeFilterMethod(id, 'all');
    const showActiveTasks = () => changeFilterMethod(id, 'active');
    const showCompletedTasks = () => changeFilterMethod(id, 'completed');

    const allFilterButtonClassName = filterMethod === 'all'
        ? styles.filterButton + ' ' + styles.activeFilterButton
        : styles.filterButton;
    const activeFilterButtonClassName = filterMethod === 'active'
        ? styles.filterButton + ' ' + styles.activeFilterButton
        : styles.filterButton;
    const completedFilterButtonClassName = filterMethod === 'completed'
        ? styles.filterButton + ' ' + styles.activeFilterButton
        : styles.filterButton;

    const addTaskCallback = (newTaskTitle: string) => addTask(id, newTaskTitle);
    const createErrorCallback = (newErrorText: string) => createError(id, newErrorText);
    const deleteToDoListCallback = () => deleteToDoList(id);

    return (
        <div>
            <div className={styles.toDoListHeader}>
                <h3>{title}</h3>
                <Button title={'X'} onClick={deleteToDoListCallback}/>
            </div>
            <AddItemForm addItem={addTaskCallback} error={error} createError={createErrorCallback}/>
            {
                mappedTasks.length === 0
                    ? <p>There are no tasks yet.</p>
                    : <ul className={styles.taskList}>{mappedTasks}</ul>
            }
            <div className={styles.buttonsContainer}>
                <Button title={'All'} onClick={showAllTasks} className={allFilterButtonClassName}/>
                <Button title={'Active'} onClick={showActiveTasks} className={activeFilterButtonClassName}/>
                <Button title={'Completed'} onClick={showCompletedTasks} className={completedFilterButtonClassName}/>
            </div>
            <div>{date}</div>
        </div>
    );
};