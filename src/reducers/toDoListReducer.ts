import {v1} from "uuid";

export enum ToDoListReducerActionTypes {
    ADD_TO_DO_LIST = 'ADD-TO-DO-LIST',
    DELETE_TO_DO_LIST = 'DELETE-TO-DO-LIST',
    CHANGE_TO_DO_LIST_TITLE = 'CHANGE-TO-DO-LIST-TITLE',
    CHANGE_TO_DO_LIST_FILTER_METHOD = 'CHANGE-TO-DO-LIST-FILTER-METHOD',
}

export type filterMethodType = 'all' | 'active' | 'completed';

type ToDoList = {
    id: string
    title: string
    filterMethod: filterMethodType
};

type State = ToDoList[];

export const toDoList1Id = v1();
export const toDoList2Id = v1();

export const toDoListReducerInitialState: State = [
    {id: toDoList1Id, title: 'What to learn', filterMethod: 'all'},
    {id: toDoList2Id, title: 'What to buy', filterMethod: 'all'},
];

export type AddToDoListAT = { type: ToDoListReducerActionTypes.ADD_TO_DO_LIST, toDoListId: string, title: string };
export type DeleteToDoListAT = { type: ToDoListReducerActionTypes.DELETE_TO_DO_LIST, toDoListId: string };

type Action =
    | AddToDoListAT
    | DeleteToDoListAT
    | { type: ToDoListReducerActionTypes.CHANGE_TO_DO_LIST_TITLE, toDoListId: string, title: string }
    | { type: ToDoListReducerActionTypes.CHANGE_TO_DO_LIST_FILTER_METHOD, toDoListId: string, filterMethod: filterMethodType }

export const toDoListReducer = (state: State = toDoListReducerInitialState, action: Action): State => {
    switch (action.type) {
        case ToDoListReducerActionTypes.ADD_TO_DO_LIST:
            const newToDoList: ToDoList = {id: v1(), title: action.title, filterMethod: 'all'};
            return [newToDoList, ...state];
        case ToDoListReducerActionTypes.DELETE_TO_DO_LIST:
            return state.filter(tdl => tdl.id !== action.toDoListId);
        case ToDoListReducerActionTypes.CHANGE_TO_DO_LIST_TITLE:
            return state.map(tdl => tdl.id === action.toDoListId ? {...tdl, title: action.title} : tdl);
        case ToDoListReducerActionTypes.CHANGE_TO_DO_LIST_FILTER_METHOD:
            return state.map(tdl => tdl.id === action.toDoListId ? {
                ...tdl,
                filterMethod: action.filterMethod
            } : tdl);
        default:
            return state;
    }
};

export const addToDoListAC = (toDoListId: string, title: string): Action => {
    return {type: ToDoListReducerActionTypes.ADD_TO_DO_LIST, toDoListId, title};
};
export const deleteToDoListAC = (toDoListId: string): Action => {
    return {type: ToDoListReducerActionTypes.DELETE_TO_DO_LIST, toDoListId};
};
export const changeToDoListTitleAC = (toDoListId: string, title: string): Action => {
    return {type: ToDoListReducerActionTypes.CHANGE_TO_DO_LIST_TITLE, toDoListId, title};
};
export const changeToDoListFilterMethodAC = (toDoListId: string, filterMethod: filterMethodType): Action => {
    return {type: ToDoListReducerActionTypes.CHANGE_TO_DO_LIST_FILTER_METHOD, toDoListId, filterMethod};
};