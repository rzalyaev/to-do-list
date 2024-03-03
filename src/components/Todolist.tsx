import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from './Todolist.module.css';
import {FilterMethodType, TaskListType, TaskType} from "../App";
import {Button} from "./Button/Button";
import {v1} from "uuid";
import {Input} from "./Input/Input";

type TodolistType = {
  id: string
  title: string
  taskList: TaskListType
  setTaskList: React.Dispatch<React.SetStateAction<TaskListType>>
  initialFilterMethod: FilterMethodType
  date?: string
  removeHandler: (todolistId: string) => void
}

export const Todolist = ({id, title, taskList, setTaskList, initialFilterMethod, date, removeHandler}: TodolistType) => {
  const removeTodolistHandler = () => removeHandler(id);
  const addTask = (todolistId: string, newTaskTitle: string) => {
    const newTask: TaskType = {id: v1(), title: newTaskTitle, isDone: false}
    setTaskList({...taskList, [todolistId]: [newTask, ...taskList[todolistId]]});
  }
  const removeTask = (todolistId: string, taskId: string) => {
    setTaskList({...taskList, [todolistId]: taskList[todolistId].filter(t => t.id !== taskId)});
  }
  const changeTaskCompletion = (todolistId: string, taskId: string) => {
    const updatedTasks: TaskType[] = taskList[todolistId].map(task => {
      if (task.id === taskId) {
        return {...task, isDone: !task.isDone};
      } else {
        return task;
      }
    });
    setTaskList({...taskList, [todolistId]: updatedTasks});
  }

  // Filtration --------------------------------------------------------------------------------------------------------
  const [filterMethod, setFilterMethod] = useState<FilterMethodType>(initialFilterMethod);
  const filterTasks = (filterMethod: FilterMethodType) => {
    if (filterMethod === 'Active') {
      return taskList[id].filter(task => !task.isDone);
    }
    if (filterMethod === 'Completed') {
      return taskList[id].filter(task => task.isDone);
    }
    return taskList[id];
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
  const isNewTaskTitleValid = (newTaskTitle: string) => {
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
    if (isNewTaskTitleValid(taskToAddTitle)) {
      addTask(id, taskToAddTitle.trim());
      setTaskToAddTitle('');
    }
  }
  const addTaskByPressEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && isNewTaskTitleValid(taskToAddTitle)) {
      addTask(id, taskToAddTitle.trim());
      setTaskToAddTitle('');
    }
  }

  // Task list mapping -----------------------------------------------------------------------------------------------------
  const tasksList = filterTasks(filterMethod).map(task => {
    const removeTaskButtonOnClickHandler = () => removeTask(id, task.id);
    const completionCheckboxOnChangeHandler = () => changeTaskCompletion(id, task.id);
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
        <div className={styles.todolistHeader}>
          <h3 className={styles.title}>{title}</h3>
          <Button title={'x'} onClickHandler={removeTodolistHandler} className={styles.removeTodolistButton} />
        </div>
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