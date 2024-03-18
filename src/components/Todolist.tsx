import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from './Todolist.module.css';
import {FilterMethodType, TaskListType} from "../App";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {
  addTaskAC,
  changeTaskCompletionAC, changeTaskTitleAC,
  removeTaskAC,
  TaskListAction,
  TasksReducerActionTypes
} from "../reducers/tasksReducer";

type TodolistType = {
  id: string
  title: string
  taskList: TaskListType
  dispatchTaskList: React.Dispatch<TaskListAction>
  filterMethod: FilterMethodType
  date?: string
  handleRemoveTodolist: () => void
  handleChangeTodolistTitle: (title: string) => void
  handleChangeTodolistFilterMethod: (newFilterMethod: FilterMethodType) => void
}

export const Todolist = ({
                           id, title, taskList, dispatchTaskList,
                           initialFilterMethod, handleRemoveTodolist, handleChangeTodolistTitle
                         }: TodolistType) => {
  const addTask = (todolistId: string, newTaskTitle: string) => {
    dispatchTaskList(addTaskAC(todolistId, newTaskTitle));
  }
  const removeTask = (todolistId: string, taskId: string) => {
    dispatchTaskList(removeTaskAC(todolistId, taskId));
  }
  const changeTaskCompletion = (todolistId: string, taskId: string, isDone: boolean) => {
    dispatchTaskList(changeTaskCompletionAC(todolistId, taskId, isDone));
  }
  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    dispatchTaskList(changeTaskTitleAC(todolistId, taskId, title));
  }

  // Filtration --------------------------------------------------------------------------------------------------------
  const filterTasks = (filterMethod: FilterMethodType) => {
    if (filterMethod === 'Active') {
      return taskList[id].filter(task => !task.isDone);
    }
    if (filterMethod === 'Completed') {
      return taskList[id].filter(task => task.isDone);
    }
    return taskList[id];
  }
  const changeFilterMethodToAll = () => handleChangeTodolistFilterMethod('All');
  const changeFilterMethodToActive = () => handleChangeTodolistFilterMethod('Active');
  const changeFilterMethodToCompleted = () => handleChangeTodolistFilterMethod('Completed');

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
          <Checkbox checked={task.isDone} onChange={handleChangeTaskCompletion}/>
          <div className={styles.taskBody}>
            <EditableSpan initialTitle={task.title} handleOnBlur={handleChangeTaskTitle}/>
            <IconButton aria-label="delete" onClick={handleRemoveTask} size={'small'}>
              <DeleteIcon/>
            </IconButton>
          </div>
        </li>
    )
  })

  return (
      <div className={styles.wrapper}>
        <div className={styles.todolistHeader}>
          <EditableSpan initialTitle={title} handleOnBlur={handleChangeTodolistTitle}/>
          <IconButton aria-label="delete" onClick={handleRemoveTodolist}>
            <DeleteIcon/>
          </IconButton>
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
          <Button variant={filterMethod === 'All' ? 'contained' : 'outlined'}
                  size={'small'}
                  onClick={changeFilterMethodToAll}
                  disableElevation
          >All</Button>
          <Button variant={filterMethod === 'Active' ? 'contained' : 'outlined'}
                  size={'small'}
                  onClick={changeFilterMethodToActive}
                  disableElevation
          >Active</Button>
          <Button variant={filterMethod === 'Completed' ? 'contained' : 'outlined'}
                  size={'small'}
                  onClick={changeFilterMethodToCompleted}
                  disableElevation
          >Completed</Button>
        </div>
      </div>
  );
};