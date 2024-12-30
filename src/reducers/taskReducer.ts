import {v1} from "uuid";
import {
    ToDoListReducerActionTypes,
    AddToDoListAT,
    DeleteToDoListAT,
    toDoList1Id,
    toDoList2Id
} from "./toDoListReducer";

enum TaskReducerActionTypes {
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

export type TaskArray = Task[];

type State = {
    [key: string]: TaskArray
}

export const taskReducerInitialState: State = {
    [toDoList1Id]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ],
    [toDoList2Id]: []
};

type Action =
    | AddToDoListAT
    | DeleteToDoListAT
    | { type: TaskReducerActionTypes.ADD_TASK, toDoListId: string, title: string }
    | { type: TaskReducerActionTypes.DELETE_TASK, toDoListId: string, taskId: string }
    | { type: TaskReducerActionTypes.CHANGE_TASK_TITLE, toDoListId: string, taskId: string, title: string }
    | { type: TaskReducerActionTypes.CHANGE_TASK_COMPLETION, toDoListId: string, taskId: string, isDone: boolean }

export const taskReducer = (state: State = taskReducerInitialState, action: Action) => {
    switch (action.type) {
        case ToDoListReducerActionTypes.ADD_TO_DO_LIST:
            return {...state, [action.toDoListId]: []};
        case ToDoListReducerActionTypes.DELETE_TO_DO_LIST:
            delete state[action.toDoListId];
            return state;
        case TaskReducerActionTypes.ADD_TASK:
            const newTask = {id: v1(), title: action.title, isDone: false};
            return {...state, [action.toDoListId]: [newTask, ...state[action.toDoListId]]};
        case TaskReducerActionTypes.DELETE_TASK:
            return {
                ...state,
                [action.toDoListId]: state[action.toDoListId].filter(task => task.id !== action.taskId)
            };
        case TaskReducerActionTypes.CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.toDoListId]: state[action.toDoListId].map(task => task.id === action.taskId ? {
                    ...task,
                    title: action.title
                } : task)
            };
        case TaskReducerActionTypes.CHANGE_TASK_COMPLETION:
            return {
                ...state,
                [action.toDoListId]: state[action.toDoListId].map(task => task.id === action.taskId ? {
                    ...task,
                    isDone: action.isDone
                } : task),
            };
        default:
            return state;
    }
};

export const addTaskAC = (toDoListId: string, title: string): Action => {
    return {type: TaskReducerActionTypes.ADD_TASK, toDoListId, title};
};
export const deleteTaskAC = (toDoListId: string, taskId: string): Action => {
    return {type: TaskReducerActionTypes.DELETE_TASK, toDoListId, taskId};
};
export const changeTaskTitleAC = (toDoListId: string, taskId: string, title: string): Action => {
    return {type: TaskReducerActionTypes.CHANGE_TASK_TITLE, toDoListId, taskId, title};
};
export const changeTaskCompletionAC = (toDoListId: string, taskId: string, isDone: boolean): Action => {
    return {type: TaskReducerActionTypes.CHANGE_TASK_COMPLETION, toDoListId, taskId, isDone};
};