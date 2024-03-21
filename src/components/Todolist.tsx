import React, {ChangeEvent, KeyboardEvent, memo, useCallback, useMemo, useState} from 'react';
import styles from './Todolist.module.css';
import {FilterMethodType, TaskListType} from "../App";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {addTaskAC, changeTaskCompletionAC, changeTaskTitleAC, removeTaskAC} from "../reducers/tasksReducer";
import {Dispatch, UnknownAction} from "redux";
import {Task} from "./Task/Task";

type TodolistType = {
  id: string
  title: string
  taskList: TaskListType
  dispatch: Dispatch<UnknownAction>
  filterMethod: FilterMethodType
  date?: string
  removeTodolist: (todolistId: string) => void
  changeTodolistTitle: (todolistId: string, title: string) => void
  changeTodolistFilterMethod: (todolistId: string, newFilterMethod: FilterMethodType) => void
}

export const Todolist = memo(({
                                id, title, taskList, dispatch, filterMethod,
                                removeTodolist, changeTodolistTitle, changeTodolistFilterMethod
                              }: TodolistType) => {
  console.log(`Todolist called (${title})`);
  const addTask = useCallback((todolistId: string, newTaskTitle: string) => {
    dispatch(addTaskAC(todolistId, newTaskTitle));
  }, []);
  const removeTask = useCallback((todolistId: string, taskId: string) => {
    dispatch(removeTaskAC(todolistId, taskId));
  }, []);
  const changeTaskCompletion = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
    dispatch(changeTaskCompletionAC(todolistId, taskId, isDone));
  }, []);
  const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
    dispatch(changeTaskTitleAC(todolistId, taskId, title));
  }, []);

  // Filtration --------------------------------------------------------------------------------------------------------
  const changeFilterMethodToAll = useCallback(() => changeTodolistFilterMethod(id, 'All'), [id]);
  const changeFilterMethodToActive = useCallback(() => changeTodolistFilterMethod(id, 'Active'), [id]);
  const changeFilterMethodToCompleted = useCallback(() => changeTodolistFilterMethod(id, 'Completed'), [id]);

  // Add task form -----------------------------------------------------------------------------------------------------
  const [taskToAddTitle, setTaskToAddTitle] = useState<string>('');
  const [error, setError] = useState('');
  const validateNewTaskTitle = (newTaskTitle: string) => {
    if (newTaskTitle.trim().length > 0) {
      return true;
    } else {
      setError('Title is required');
      return false;
    }
  };
  const changeTaskToAddTitle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.trim().length > 0 && error !== '') {
      setError('');
    }
    setTaskToAddTitle(event.currentTarget.value);
  }, []);
  const addTaskByClickOnButton = useCallback(() => {
    if (validateNewTaskTitle(taskToAddTitle)) {
      addTask(id, taskToAddTitle.trim());
      setTaskToAddTitle('');
    }
  }, [id, taskToAddTitle]);
  const addTaskByPressEnter = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTaskByClickOnButton();
    }
  }, []);

  // Event handlers ----------------------------------------------------------------------------------------------------
  const handleOnBlur = useCallback((title: string) => changeTodolistTitle(id, title), [id]);

  // Task list mapping -------------------------------------------------------------------------------------------------
  const finalTaskList = useMemo(() => {
    return taskList[id]
        .filter(task => filterMethod === 'All'
            ? task
            : filterMethod === 'Active'
                ? !task.isDone
                : task.isDone)
        .map(task => {
          const taskClassName: string = `${styles.task} ${task.isDone ? styles.isDone : ''}`;
          return (
              <Task key={task.id}
                    className={taskClassName}
                    task={task}
                    todolistId={id}
                    changeTaskCompletion={changeTaskCompletion}
                    removeTask={removeTask}
                    changeTaskTitle={changeTaskTitle}
              />
          )
        });
  }, [taskList, filterMethod]);

  return (
      <div className={styles.wrapper}>
        <div className={styles.todolistHeader}>
          <EditableSpan initialTitle={title} handleOnBlur={handleOnBlur}/>
          <IconButton aria-label="delete" onClick={() => removeTodolist(id)}>
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
          {finalTaskList.length > 0 ? finalTaskList : "There is no task"}
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
});