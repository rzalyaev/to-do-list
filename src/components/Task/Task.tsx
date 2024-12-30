import React, {ChangeEvent} from 'react';
import styles from "../ToDoList.module.css";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button} from "../Button/Button";
import {
    changeTaskCompletionAC,
    changeTaskTitleAC,
    deleteTaskAC,
} from "../../reducers/taskReducer";

type TaskProps = {
    toDoListId: string
    taskId: string
    title: string
    isDone: boolean
    taskReducerDispatch: any
}

export const Task = ({toDoListId, taskId, title, isDone, taskReducerDispatch}: TaskProps) => {
    const deleteTask = (toDoListId: string, taskId: string) => taskReducerDispatch(deleteTaskAC(toDoListId, taskId));
    const changeTaskTitle = (toDoListId: string, taskId: string, title: string) => {
        taskReducerDispatch(changeTaskTitleAC(toDoListId, taskId, title));
    };
    const changeTaskCompletion = (toDoListId: string, taskId: string, isDone: boolean) => {
        taskReducerDispatch(changeTaskCompletionAC(toDoListId, taskId, isDone));
    }

    const handleTaskDeletion = () => deleteTask(toDoListId, taskId);
    const handleTaskTitleChange = (title: string) => changeTaskTitle(toDoListId, taskId, title);
    const handleTaskCompletionChange = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskCompletion(toDoListId, taskId, e.currentTarget.checked);
    }

    const itemClassName = `${styles.taskListItem} ${isDone ? styles.inactive : ''}`;

    return (
        <li key={taskId} className={itemClassName}>
            <div className={styles.taskBody}>
                <input type="checkbox" checked={isDone} onChange={handleTaskCompletionChange}/>
                <EditableSpan onChange={handleTaskTitleChange} className={styles.taskTitle}>{title}</EditableSpan>
            </div>
            <Button title={'x'}
                    onClick={handleTaskDeletion}
                    className={styles.deleteButton}
            />
        </li>
    );
};