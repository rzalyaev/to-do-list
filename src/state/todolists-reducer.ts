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
            return [...state, {id: newTodoId, title: action.title, filter: 'all'}]
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

export const AddTodolistAC = (title: string): AddTodolistAT =>
    ({type: 'ADD-TODOLIST', title})
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT =>
    ({type: 'CHANGE-TODOLIST-TITLE' as const, id, title})
export const ChangeTodolistFilterAC = (id: string, filter: FilterType): ChangeTodolistFilterAT =>
    ({type: 'CHANGE-TODOLIST-FILTER' as const, id, filter})
export const RemoveTodolistAC = (todolistId: string): RemoveTodolistAT =>
    ({type: 'REMOVE-TODOLIST', id: todolistId})
