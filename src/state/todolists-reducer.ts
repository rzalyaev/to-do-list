import {FilterType, TodolistType} from "../App";
import {v1} from "uuid";

type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
}

type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterType
}

type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}

type ActionsType =
    AddTodolistAT
    | ChangeTodolistTitleAT
    | ChangeTodolistFilterAT
    | RemoveTodolistAT


export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType) => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            const newTodoId = v1()
            return [...state, {newTodoId, title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todolist => todolist.id === action.id ? {...todolist, title: action.title} : todolist)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todolist => todolist.id === action.id ? {...todolist, filter: action.filter} : todolist)
        case 'REMOVE-TODOLIST':
            return state.filter(todolist => todolist.id !== action.id)
        default:
            throw new Error('I don\'t understand this type')
    }
}