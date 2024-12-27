import React, {ChangeEvent} from 'react';
import styles from './ToDoList.module.css';
import {filterMethodType, Task} from "../App";
import {Button} from "./Button/Button";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan/EditableSpan";

type Props = {
    id: string
    title: string
    filterMethod: filterMethodType
    tasks: Task[]
    changeToDoListTitle: (toDoListId: string, title: string) => void
    changeFilterMethod: (toDoListId: string, filterMethod: filterMethodType) => void
    deleteToDoList: (toDoListId: string) => void
    addTask: (toDoListId: string, title: string) => void
    deleteTask: (toDoListId: string, taskId: string) => void
    filterTasks: (tasks: Task[], filterMethod: filterMethodType) => Task[]
    changeTaskTitle: (toDoListId: string, taskId: string, title: string) => void
    changeTaskCompletion: (toDoListId: string, taskId: string, newTaskCompletionValue: boolean) => void
    date?: string
}

export const ToDoList = ({
                             id,
                             title,
                             filterMethod,
                             tasks,
                             changeToDoListTitle,
                             changeFilterMethod,
                             deleteToDoList,
                             addTask,
                             deleteTask,
                             filterTasks,
                             changeTaskTitle,
                             changeTaskCompletion,
                             date
                         }: Props) => {
    const mappedTasks = filterTasks(tasks, filterMethod).map(task => {
        const handleTaskDeletion = () => deleteTask(id, task.id);
        const handleTaskTitleChange = (title: string) => changeTaskTitle(id, task.id, title);
        const handleTaskCompletion = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskCompletion(id, task.id, e.currentTarget.checked);
        }
        const itemClassName = `${styles.taskListItem} ${task.isDone ? styles.inactive : ''}`;
        return (
            <li key={task.id} className={itemClassName}>
                <div className={styles.taskBody}>
                    <input type="checkbox" checked={task.isDone} onChange={handleTaskCompletion}/>
                    <EditableSpan onChange={handleTaskTitleChange} className={styles.taskTitle}>{task.title}</EditableSpan>
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

    const changeToDoListTitleCallback = (title: string) => changeToDoListTitle(id, title);
    const deleteToDoListCallback = () => deleteToDoList(id);
    const addTaskCallback = (newTaskTitle: string) => addTask(id, newTaskTitle);

    return (
        <div>
            <div className={styles.toDoListHeader}>
                <EditableSpan onChange={changeToDoListTitleCallback} className={styles.toDoListTitle}>{title}</EditableSpan>
                <Button title={'X'} onClick={deleteToDoListCallback}/>
            </div>
            <AddItemForm addItem={addTaskCallback}/>
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