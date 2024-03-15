import {TodolistsType, TodolistType} from "../App";

export enum TodolistsReducerActionTypes {
  ADD_TODOLIST = 'reducers/todolistsReducer/ADD-TODOLIST',
  REMOVE_TODOLIST = 'reducers/todolistsReducer/REMOVE_TODOLIST',
  CHANGE_TODOLIST_TITLE = 'reducers/todolistsReducer/CHANGE-TODOLIST-TITLE'
}

export type AddTodolistAT = {
  type: TodolistsReducerActionTypes.ADD_TODOLIST
  newTodolistId: string
  newTodolistTitle: string
}
export type RemoveTodolistAT = {
  type: TodolistsReducerActionTypes.REMOVE_TODOLIST
  todolistId: string
}
type ChangeTodolistTitleAT = {
  type: TodolistsReducerActionTypes.CHANGE_TODOLIST_TITLE
  todolistId: string
  title: string
}

type TodolistsAction = AddTodolistAT | RemoveTodolistAT | ChangeTodolistTitleAT;

export const todolistsReducer = (state: TodolistsType, action: TodolistsAction): TodolistsType => {
  switch (action.type) {
    case TodolistsReducerActionTypes.ADD_TODOLIST:
      const newTodolist: TodolistType = {
        id: action.newTodolistId,
        title: action.newTodolistTitle.trim(),
        initialFilterMethod: "All"
      };
      return [...state, newTodolist];
    case TodolistsReducerActionTypes.REMOVE_TODOLIST:
      return state.filter(todolist => todolist.id !== action.todolistId);
    case TodolistsReducerActionTypes.CHANGE_TODOLIST_TITLE:
      return state.map(todolist =>
          todolist.id === action.todolistId ? {...todolist, title: action.title} : todolist);
    default: throw new Error('Unknown action type');
  }
}

export const addTodolistAC = (newTodolistId: string, newTodolistTitle: string): AddTodolistAT => {
  return {type: TodolistsReducerActionTypes.ADD_TODOLIST, newTodolistId, newTodolistTitle}
}
export const removeTodolistAC = (todolistId: string): RemoveTodolistAT => {
  return {type: TodolistsReducerActionTypes.REMOVE_TODOLIST, todolistId}
}
export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleAT => {
  return {type: TodolistsReducerActionTypes.CHANGE_TODOLIST_TITLE, todolistId, title}
}