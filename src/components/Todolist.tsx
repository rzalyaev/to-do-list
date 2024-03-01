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
    return (
        <li key={task.id}>
          <Input type="checkbox" onChangeHandler={completionCheckboxOnChangeHandler} checked={task.isDone}/>
          <span>{task.title}</span>
          <Button title={"x"} onClick={removeTaskButtonOnClickHandler}/>
        </li>
    )
  })

  return (
      <div>
        <h3>{title}</h3>
        <div>
          <Input type={"text"} value={taskToAddTitle} onChangeHandler={changeTaskToAddTitle}
                 onKeyUpHandler={addTaskByPressEnter}/>
          <Button title={"+"} onClick={addTaskByClickOnButton} disabled={taskToAddTitle.length < 1}/>
        </div>
        <ul>
          {tasksList.length > 0 ? tasksList : "There is no task"}
        </ul>
        <div>
          <Button title={"All"} onClick={changeFilterMethodToAll}/>
          <Button title={"Active"} onClick={changeFilterMethodToActive}/>
          <Button title={"Completed"} onClick={changeFilterMethodToCompleted}/>
        </div>
        <div>{date}</div>
      </div>
  );
};