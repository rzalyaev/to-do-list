import {TaskListType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT, TodolistsReducerActionTypes} from "./todolistsReducer";

export enum TasksReducerActionTypes {
  ADD_TASK = 'reducers/tasksReducer/ADD-TASK',
  REMOVE_TASK = 'reducers/tasksReducer/REMOVE_TASK',
  CHANGE_TASK_COMPLETION = 'reducers/tasksReducer/CHANGE-TASK-COMPLETION',
  CHANGE_TASK_TITLE = 'reducers/tasksReducer/CHANGE-TASK-TITLE'
}

type AddTaskAT = {
  type: TasksReducerActionTypes.ADD_TASK
  todolistId: string
  newTaskTitle: string
}
type RemoveTaskAT = {
  type: TasksReducerActionTypes.REMOVE_TASK
  todolistId: string
  taskId: string
}
type ChangeTaskCompletionAT = {
  type: TasksReducerActionTypes.CHANGE_TASK_COMPLETION
  todolistId: string
  taskId: string
  isDone: boolean
}
type ChangeTaskTitleAT = {
  type: TasksReducerActionTypes.CHANGE_TASK_TITLE
  todolistId: string
  taskId: string
  title: string
}

export type TaskListAction =
    AddTodolistAT
    | RemoveTodolistAT
    | AddTaskAT
    | RemoveTaskAT
    | ChangeTaskCompletionAT
    | ChangeTaskTitleAT;

export const tasksReducer = (state: TaskListType, action: TaskListAction): TaskListType => {
  switch (action.type) {
    case TodolistsReducerActionTypes.ADD_TODOLIST:
      return {...state, [action.newTodolistId]: []};
    case TodolistsReducerActionTypes.REMOVE_TODOLIST:
      delete(state[action.todolistId]);
      return state;
    case TasksReducerActionTypes.ADD_TASK:
      const newTask: TaskType = {id: v1(), title: action.newTaskTitle, isDone: false}
      return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]};
    case TasksReducerActionTypes.REMOVE_TASK:
      return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)};
    case TasksReducerActionTypes.CHANGE_TASK_COMPLETION:
      const updatedTasks: TaskType[] = state[action.todolistId].map(task => {
        if (task.id === action.taskId) {
          return {...task, isDone: action.isDone};
        } else {
          return task;
        }
      });
      return {...state, [action.todolistId]: updatedTasks};
    case TasksReducerActionTypes.CHANGE_TASK_TITLE:
      if (action.title.trim() !== '') {
        return {
          ...state,
          [action.todolistId]: state[action.todolistId]
              .map(task => task.id === action.taskId ? {...task, title: action.title.trim()} : task)
        }
      } else {
        return state;
      }
    default: throw new Error('Unknown action type');
  }
}

export const addTaskAC = (todolistId: string, newTaskTitle: string): AddTaskAT => {
  return {type: TasksReducerActionTypes.ADD_TASK, todolistId, newTaskTitle};
}
export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskAT => {
  return {type: TasksReducerActionTypes.REMOVE_TASK, todolistId, taskId};
}
export const changeTaskCompletionAC = (todolistId: string, taskId: string, isDone: boolean): ChangeTaskCompletionAT => {
  return {type: TasksReducerActionTypes.CHANGE_TASK_COMPLETION, todolistId, taskId, isDone};
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleAT => {
  return {type: TasksReducerActionTypes.CHANGE_TASK_TITLE, todolistId, taskId, title};
}