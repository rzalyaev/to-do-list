import {v1} from "uuid";

enum TaskReducerActionTypes {
    CREATE_TASK_ARRAY = 'CREATE-TASK-ARRAY',
    DELETE_TASK_ARRAY = 'DELETE-TASK-ARRAY',
    ADD_TASK = 'ADD-TASK',
    DELETE_TASK = 'DELETE-TASK',
    CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE',
    CHANGE_TASK_COMPLETION = 'CHANGE-TASK-COMPLETION',
}

type Task = {
    id: string
    title: string
    isDone: boolean
}

export type TaskArray = Task[]

export type TaskState = {
    [key: string]: TaskArray
}

type Action =
    | { type: TaskReducerActionTypes.CREATE_TASK_ARRAY, payload: { toDoListId: string } }
    | { type: TaskReducerActionTypes.DELETE_TASK_ARRAY, payload: { toDoListId: string } }
    | { type: TaskReducerActionTypes.ADD_TASK, payload: { toDoListId: string, title: string } }
    | { type: TaskReducerActionTypes.DELETE_TASK, payload: { toDoListId: string, taskId: string } }
    | { type: TaskReducerActionTypes.CHANGE_TASK_TITLE, payload: { toDoListId: string, taskId: string, title: string } }
    | {
    type: TaskReducerActionTypes.CHANGE_TASK_COMPLETION,
    payload: { toDoListId: string, taskId: string, isDone: boolean }
}

export const taskReducer = (state: TaskState = {}, action: Action) => {
    switch (action.type) {
        case TaskReducerActionTypes.CREATE_TASK_ARRAY:
            return {...state, [action.payload.toDoListId]: []}
        case TaskReducerActionTypes.DELETE_TASK_ARRAY:
            delete state[action.payload.toDoListId]
            return state
        case TaskReducerActionTypes.ADD_TASK:
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.toDoListId]: [newTask, ...state[action.payload.toDoListId]]}
        case TaskReducerActionTypes.DELETE_TASK:
            return {
                ...state,
                [action.payload.toDoListId]: state[action.payload.toDoListId].filter(task => task.id !== action.payload.taskId)
            }
        case TaskReducerActionTypes.CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.payload.toDoListId]: state[action.payload.toDoListId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    title: action.payload.title
                } : task)
            }
        case TaskReducerActionTypes.CHANGE_TASK_COMPLETION:
            return {
                ...state,
                [action.payload.toDoListId]: state[action.payload.toDoListId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    isDone: action.payload.isDone
                } : task),
            }
        default:
            return state
    }
};

export const createTaskArrayAC = (toDoListId: string): Action => {
    return {type: TaskReducerActionTypes.CREATE_TASK_ARRAY, payload: {toDoListId}}
}
export const deleteTaskArrayAC = (toDoListId: string): Action => {
    return {type: TaskReducerActionTypes.DELETE_TASK_ARRAY, payload: {toDoListId}}
}
export const addTaskAC = (toDoListId: string, title: string): Action => {
    return {type: TaskReducerActionTypes.ADD_TASK, payload: {toDoListId, title}}
}
export const deleteTaskAC = (toDoListId: string, taskId: string): Action => {
    return {type: TaskReducerActionTypes.DELETE_TASK, payload: {toDoListId, taskId}}
}
export const changeTaskTitleAC = (toDoListId: string, taskId: string, title: string): Action => {
    return {type: TaskReducerActionTypes.CHANGE_TASK_TITLE, payload: {toDoListId, taskId, title}}
}
export const changeTaskCompletionAC = (toDoListId: string, taskId: string, isDone: boolean): Action => {
    return {type: TaskReducerActionTypes.CHANGE_TASK_COMPLETION, payload: {toDoListId, taskId, isDone}}
}