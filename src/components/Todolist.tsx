import React from 'react';
import {TasksType} from "../App";
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
  const tasksList = tasks.map(task => {
    return <li key={task.id}><input type="checkbox" checked={task.isDone}/> <span>{task.title}</span></li>
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
          <Button title={"All"}/>
          <Button title={"Active"}/>
          <Button title={"Completed"}/>
        </div>
        <div>{date}</div>
      </div>
  );
};