import {FilterMethodType, TodolistsType, TodolistType} from "../App";

export enum TodolistsReducerActionTypes {
  ADD_TODOLIST = 'reducers/todolistsReducer/ADD-TODOLIST',
  REMOVE_TODOLIST = 'reducers/todolistsReducer/REMOVE_TODOLIST',
  CHANGE_TODOLIST_TITLE = 'reducers/todolistsReducer/CHANGE-TODOLIST-TITLE',
  CHANGE_TODOLIST_FILTER_METHOD = 'reducers/todolistsReducer/CHANGE-TODOLIST-FILTER-METHOD'
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
type ChangeTodolistFilterMethodAT = {
  type: TodolistsReducerActionTypes.CHANGE_TODOLIST_FILTER_METHOD
  todolistId: string
  newFilterMethod: FilterMethodType
}

type TodolistsAction = AddTodolistAT | RemoveTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterMethodAT;

const initialState: TodolistsType = []

export const todolistsReducer = (state: TodolistsType = initialState, action: TodolistsAction): TodolistsType => {
  switch (action.type) {
    case TodolistsReducerActionTypes.ADD_TODOLIST:
      const newTodolist: TodolistType = {
        id: action.newTodolistId,
        title: action.newTodolistTitle.trim(),
        filterMethod: "All"
      };
      return [...state, newTodolist];
    case TodolistsReducerActionTypes.REMOVE_TODOLIST:
      return state.filter(todolist => todolist.id !== action.todolistId);
    case TodolistsReducerActionTypes.CHANGE_TODOLIST_TITLE:
      return state.map(todolist =>
          todolist.id === action.todolistId ? {...todolist, title: action.title} : todolist);
    case TodolistsReducerActionTypes.CHANGE_TODOLIST_FILTER_METHOD:
      return state.map(todolist => todolist.id === action.todolistId
          ? {...todolist, filterMethod: action.newFilterMethod}
          : todolist
      );
    default: return state;
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
export const changeTodolistFilterMethodAC =
    (todolistId: string, newFilterMethod: FilterMethodType): ChangeTodolistFilterMethodAT => {
  return {type: TodolistsReducerActionTypes.CHANGE_TODOLIST_FILTER_METHOD, todolistId, newFilterMethod}
}