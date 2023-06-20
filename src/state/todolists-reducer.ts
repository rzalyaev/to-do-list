import {TodolistType} from "../App";
import {v1} from "uuid";

type ActionType = {
    type: string
    [key: string]: any
}

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            const newTodoId = v1()
            return [...state, {newTodoId, title: action.title, filter: 'all'}]
        case 'REMOVE-TODOLIST':
            return state.filter(todolist => todolist.id !== action.id)
        default:
            throw new Error('I don\'t understand this type')
    }
}