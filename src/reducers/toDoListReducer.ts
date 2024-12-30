import {v1} from "uuid";

enum ToDoListReducerActionTypes {
    ADD_TO_DO_LIST = 'ADD-TO-DO-LIST',
    DELETE_TO_DO_LIST = 'DELETE-TO-DO-LIST',
    CHANGE_TO_DO_LIST_TITLE = 'CHANGE-TO-DO-LIST-TITLE',
    CHANGE_TO_DO_LIST_FILTER_METHOD = 'CHANGE-TO-DO-LIST-FILTER-METHOD',
}

export type filterMethodType = 'all' | 'active' | 'completed'

type ToDoList = {
    id: string
    title: string
    filterMethod: filterMethodType
}

export type ToDoListState = ToDoList[]

export const toDoList1Id = v1()
export const toDoList2Id = v1()

type Action =
    | { type: ToDoListReducerActionTypes.ADD_TO_DO_LIST, payload: { toDoListId: string, title: string } }
    | { type: ToDoListReducerActionTypes.DELETE_TO_DO_LIST, payload: { toDoListId: string } }
    | { type: ToDoListReducerActionTypes.CHANGE_TO_DO_LIST_TITLE, payload: { toDoListId: string, title: string } }
    | {
    type: ToDoListReducerActionTypes.CHANGE_TO_DO_LIST_FILTER_METHOD,
    payload: { toDoListId: string, filterMethod: filterMethodType }
}

export const toDoListReducer = (state: ToDoListState = [], action: Action): ToDoListState => {
    switch (action.type) {
        case ToDoListReducerActionTypes.ADD_TO_DO_LIST:
            const newToDoList: ToDoList = {id: v1(), title: action.payload.title, filterMethod: 'all'}
            return [newToDoList, ...state]
        case ToDoListReducerActionTypes.DELETE_TO_DO_LIST:
            return state.filter(tdl => tdl.id !== action.payload.toDoListId)
        case ToDoListReducerActionTypes.CHANGE_TO_DO_LIST_TITLE:
            return state.map(tdl => tdl.id === action.payload.toDoListId ? {...tdl, title: action.payload.title} : tdl)
        case ToDoListReducerActionTypes.CHANGE_TO_DO_LIST_FILTER_METHOD:
            return state.map(tdl => tdl.id === action.payload.toDoListId ? {
                ...tdl,
                filterMethod: action.payload.filterMethod
            } : tdl)
        default:
            return state
    }
};

export const addToDoListAC = (toDoListId: string, title: string): Action => {
    return {type: ToDoListReducerActionTypes.ADD_TO_DO_LIST, payload: {toDoListId, title}}
}
export const deleteToDoListAC = (toDoListId: string): Action => {
    return {type: ToDoListReducerActionTypes.DELETE_TO_DO_LIST, payload: {toDoListId}}
}
export const changeToDoListTitleAC = (toDoListId: string, title: string): Action => {
    return {type: ToDoListReducerActionTypes.CHANGE_TO_DO_LIST_TITLE, payload: {toDoListId, title}}
}
export const changeToDoListFilterMethodAC = (toDoListId: string, filterMethod: filterMethodType): Action => {
    return {type: ToDoListReducerActionTypes.CHANGE_TO_DO_LIST_FILTER_METHOD, payload: {toDoListId, filterMethod}}
}