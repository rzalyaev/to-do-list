import React, {ChangeEvent, useState} from 'react';
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

  // Tasks mapping -----------------------------------------------------------------------------------------------------
  const tasksList = filterTasks(filterMethod).map(task => {
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
          <input/>
          <Button title={"+"}/>
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