import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from './Todolist.module.css';
import {FilterMethodType, TaskListType, TaskType} from "../App";
import {Button} from "./Button/Button";
import {v1} from "uuid";
import {Input} from "./Input/Input";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan/EditableSpan";

type TodolistType = {
  id: string
  title: string
  taskList: TaskListType
  setTaskList: React.Dispatch<React.SetStateAction<TaskListType>>
  initialFilterMethod: FilterMethodType
  date?: string
  handleRemoveTodolist: () => void
  handleChangeTodolistTitle: (title: string) => void
}

export const Todolist = ({
                           id, title, taskList, setTaskList,
                           initialFilterMethod, handleRemoveTodolist, handleChangeTodolistTitle
}: TodolistType) => {
  const addTask = (todolistId: string, newTaskTitle: string) => {
    const newTask: TaskType = {id: v1(), title: newTaskTitle, isDone: false}
    setTaskList({...taskList, [todolistId]: [newTask, ...taskList[todolistId]]});
  }
  const removeTask = (todolistId: string, taskId: string) => {
    setTaskList({...taskList, [todolistId]: taskList[todolistId].filter(t => t.id !== taskId)});
  }
  const changeTaskCompletion = (todolistId: string, taskId: string, isDone: boolean) => {
    const updatedTasks: TaskType[] = taskList[todolistId].map(task => {
      if (task.id === taskId) {
        return {...task, isDone};
      } else {
        return task;
      }
    });
    setTaskList({...taskList, [todolistId]: updatedTasks});
  }

  // Filtration --------------------------------------------------------------------------------------------------------
  const [filterMethod, setFilterMethod]
      = useState<FilterMethodType>(initialFilterMethod);
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
    if (event.key === 'Enter') {
      addTaskByClickOnButton();
    }
  }

  // Task title changing -----------------------------------------------------------------------------------------------
  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    if (title.trim() !== '') {
      setTaskList({
        ...taskList,
        [todolistId]: taskList[todolistId]
            .map(task => task.id === taskId ? {...task, title: title.trim()} : task)
      })
    } else {
      setTaskList(taskList);
    }
  }

  // Task list mapping -------------------------------------------------------------------------------------------------
  const tasksList = filterTasks(filterMethod).map(task => {
    const handleChangeTaskCompletion = (event: ChangeEvent<HTMLInputElement>) => {
      changeTaskCompletion(id, task.id, event.currentTarget.checked);
    }
    const handleRemoveTask = () => removeTask(id, task.id);
    const handleChangeTaskTitle = (title: string) => changeTaskTitle(id, task.id, title);
    const taskClassName: string = `${styles.task} ${task.isDone ? styles.isDone : ''}`;
    return (
        <li key={task.id} className={taskClassName}>
          <Input type="checkbox"
                 onChangeHandler={handleChangeTaskCompletion}
                 checked={task.isDone}
                 inputClassName={styles.checkbox}
          />
          <div className={styles.taskBody}>
            <EditableSpan initialTitle={task.title} handleOnBlur={handleChangeTaskTitle}/>
            <Button title={"x"}
                    onClickHandler={handleRemoveTask}
                    buttonClassName={styles.deleteTaskButton}
            />
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
          <h3 className={styles.title}>
            <EditableSpan initialTitle={title} handleOnBlur={handleChangeTodolistTitle}/>
          </h3>
          <Button title={'x'} onClickHandler={handleRemoveTodolist} buttonClassName={styles.removeTodolistButton}/>
        </div>
        <AddItemForm type={'text'}
                     value={taskToAddTitle}
                     onChangeHandler={changeTaskToAddTitle}
                     onKeyUpHandler={addTaskByPressEnter}
                     placeholder={'Enter task title...'}
                     title={'+'}
                     onClickHandler={addTaskByClickOnButton}
                     errorStatus={error}
                     className={styles.addTaskForm}
        />
        <ul className={styles.taskList}>
          {tasksList.length > 0 ? tasksList : "There is no task"}
        </ul>
        <div className={styles.filterButtons}>
          <Button title={"All"}
                  onClickHandler={changeFilterMethodToAll}
                  buttonClassName={allFilterButtonClassName}
          />
          <Button title={"Active"}
                  onClickHandler={changeFilterMethodToActive}
                  buttonClassName={activeFilterButtonClassName}
          />
          <Button title={"Completed"}
                  onClickHandler={changeFilterMethodToCompleted}
                  buttonClassName={completedFilterButtonClassName}
          />
        </div>
      </div>
  );
};