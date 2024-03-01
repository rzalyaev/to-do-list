import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from './Todolist.module.css';
import {TasksType, TaskType} from "../App";
import {Button} from "./Button/Button";
import {v1} from "uuid";
import {Input} from "./Input/Input";

type TodolistType = {
  title: string
  tasks: TasksType
  date?: string
}

export type FilterMethodType = 'All' | 'Active' | 'Completed'

export const Todolist = ({title, tasks, date}: TodolistType) => {
  const [currentTasks, setCurrentTasks] = useState<TasksType>(tasks);
  const addTask = (newTaskTitle: string) => {
    const newTask: TaskType = {id: v1(), title: newTaskTitle, isDone: false}
    setCurrentTasks([newTask, ...currentTasks]);
  }
  const removeTask = (taskId: string) => {
    setCurrentTasks(currentTasks.filter(task => task.id !== taskId));
  }
  const changeTaskCompletion = (taskId: string) => {
    const updatedTasks: TasksType = currentTasks.map(task => {
      if (task.id === taskId) {
        return {...task, isDone: !task.isDone};
      } else {
        return task;
      }
    });
    setCurrentTasks(updatedTasks);
  }

  // Filtration --------------------------------------------------------------------------------------------------------
  const [filterMethod, setFilterMethod] = useState<FilterMethodType>('All');
  const filterTasks = (filterMethod: FilterMethodType) => {
    if (filterMethod === 'Active') {
      return currentTasks.filter(task => !task.isDone);
    }
    if (filterMethod === 'Completed') {
      return currentTasks.filter(task => task.isDone);
    }
    return currentTasks;
  }
  const changeFilterMethod = (newFilterMethod: FilterMethodType) => {
    setFilterMethod(newFilterMethod);
    filterTasks(filterMethod);
  }
  const changeFilterMethodToAll = () => changeFilterMethod('All');
  const changeFilterMethodToActive = () => changeFilterMethod('Active');
  const changeFilterMethodToCompleted = () => changeFilterMethod('Completed');

  // Add task form -----------------------------------------------------------------------------------------------------
  const [taskToAddTitle, setTaskToAddTitle] = useState<string>('');
  const [error, setError] = useState('');
  const newTaskTitleIsValid = (newTaskTitle: string) => {
    if (newTaskTitle.trim().length > 0) {
      return true;
    } else {
      setError('Title is required');
      return false;
    }
  }
  const changeTaskToAddTitle = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.trim().length > 0) {
      setError('');
    }
    setTaskToAddTitle(event.currentTarget.value);
  }
  const addTaskByClickOnButton = () => {
    if (newTaskTitleIsValid(taskToAddTitle)) {
      addTask(taskToAddTitle.trim());
      setTaskToAddTitle('');
    }
  }
  const addTaskByPressEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && newTaskTitleIsValid(taskToAddTitle)) {
      addTask(taskToAddTitle.trim());
      setTaskToAddTitle('');
    }
  }

  // Tasks mapping -----------------------------------------------------------------------------------------------------
  const tasksList = filterTasks(filterMethod).map(task => {
    const removeTaskButtonOnClickHandler = () => removeTask(task.id);
    const completionCheckboxOnChangeHandler = () => changeTaskCompletion(task.id);
    const taskClassName: string = `${styles.task} ${task.isDone ? styles.isDone : ''}`;
    return (
        <li key={task.id} className={taskClassName}>
          <Input type="checkbox"
                 onChangeHandler={completionCheckboxOnChangeHandler}
                 checked={task.isDone}
                 className={styles.checkbox}
          />
          <div className={styles.taskBody}>
            <div className={styles.taskTitle}><span className={styles.taskTitleBody}>{task.title}</span></div>
            <Button title={"x"} onClickHandler={removeTaskButtonOnClickHandler} className={styles.deleteTaskButton}/>
          </div>
        </li>
    )
  })

  // Class names -------------------------------------------------------------------------------------------------------
  const allFilterButtonClassName: string =
      `${filterMethod === 'All' ? styles.activeFilterButton : styles.filterButton}`;
  const activeFilterButtonClassName: string =
      `${filterMethod === 'Active' ? styles.activeFilterButton : styles.filterButton}`;
  const completedFilterButtonClassName: string =
      `${filterMethod === 'Completed' ? styles.activeFilterButton : styles.filterButton}`;

  return (
      <div className={styles.wrapper}>
        <h3 className={styles.title}>{title}</h3>
        <div>
          <div className={styles.addTaskForm}>
            <Input type={"text"}
                   value={taskToAddTitle}
                   onChangeHandler={changeTaskToAddTitle}
                   onKeyUpHandler={addTaskByPressEnter}
            />
            <Button title={"+"} onClickHandler={addTaskByClickOnButton}/>
          </div>
          <div className={styles.error}>{error}</div>
        </div>
        <ul className={styles.taskList}>
          {tasksList.length > 0 ? tasksList : "There is no task"}
        </ul>
        <div className={styles.filterButtons}>
          <Button title={"All"}
                  onClickHandler={changeFilterMethodToAll}
                  className={allFilterButtonClassName}
          />
          <Button title={"Active"}
                  onClickHandler={changeFilterMethodToActive}
                  className={activeFilterButtonClassName}
          />
          <Button title={"Completed"}
                  onClickHandler={changeFilterMethodToCompleted}
                  className={completedFilterButtonClassName}
          />
        </div>
      </div>
  );
};