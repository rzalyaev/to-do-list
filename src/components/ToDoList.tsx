import React from 'react';
import styles from './ToDoList.module.css';
import {Button} from "./Button/Button";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Task} from "./Task/Task";
import {
    changeToDoListFilterMethodAC,
    changeToDoListTitleAC,
    deleteToDoListAC,
    filterMethodType
} from "../reducers/toDoListReducer";
import {addTaskAC, TaskArray} from "../reducers/taskReducer";

type Props = {
    toDoListId: string
    title: string
    tasks: TaskArray
    filterMethod: filterMethodType
    date?: string
    toDoListReducerDispatch: any
    taskReducerDispatch: any
}

export const ToDoList = ({
                             toDoListId,
                             title,
                             tasks,
                             filterMethod,
                             date,
                             toDoListReducerDispatch,
                             taskReducerDispatch
                         }: Props) => {


    const filterTasks = (tasks: TaskArray, filterMethod: filterMethodType) => {
        switch (filterMethod) {
            case 'active':
                return tasks.filter(task => !task.isDone);
            case 'completed':
                return tasks.filter(task => task.isDone);
            default:
                return tasks;
        }
    };

    const deleteToDoList = (toDoListId: string) => {
        toDoListReducerDispatch(deleteToDoListAC(toDoListId));
        taskReducerDispatch(deleteToDoListAC(toDoListId));
    };

    const changeToDoListTitle = (toDoListId: string, title: string) => {
        toDoListReducerDispatch(changeToDoListTitleAC(toDoListId, title));
    };

    const changeFilterMethod = (toDoListId: string, filterMethod: filterMethodType) => {
        toDoListReducerDispatch(changeToDoListFilterMethodAC(toDoListId, filterMethod));
    };

    const addTask = (toDoListId: string, title: string) => taskReducerDispatch(addTaskAC(toDoListId, title));

    const mappedTasks = filterTasks(tasks, filterMethod).map(task => {
        return (
            <Task toDoListId={toDoListId} taskId={task.id} title={task.title} isDone={task.isDone}
                  taskReducerDispatch={taskReducerDispatch}/>
        );
    });

    const showAllTasks = () => changeFilterMethod(toDoListId, 'all');
    const showActiveTasks = () => changeFilterMethod(toDoListId, 'active');
    const showCompletedTasks = () => changeFilterMethod(toDoListId, 'completed');

    const allFilterButtonClassName = filterMethod === 'all'
        ? styles.filterButton + ' ' + styles.activeFilterButton
        : styles.filterButton;
    const activeFilterButtonClassName = filterMethod === 'active'
        ? styles.filterButton + ' ' + styles.activeFilterButton
        : styles.filterButton;
    const completedFilterButtonClassName = filterMethod === 'completed'
        ? styles.filterButton + ' ' + styles.activeFilterButton
        : styles.filterButton;

    const changeToDoListTitleCallback = (title: string) => changeToDoListTitle(toDoListId, title);
    const deleteToDoListCallback = () => deleteToDoList(toDoListId);
    const addTaskCallback = (newTaskTitle: string) => addTask(toDoListId, newTaskTitle);

    return (
        <div>
            <div className={styles.toDoListHeader}>
                <EditableSpan onChange={changeToDoListTitleCallback}
                              className={styles.toDoListTitle}>{title}</EditableSpan>
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