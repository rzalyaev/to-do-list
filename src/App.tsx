import React, {useReducer} from 'react';
import './App.css';
import {ToDoList} from "./components/ToDoList";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {
    addToDoListAC,
    toDoListReducerInitialState,
    toDoListReducer,
} from "./reducers/toDoListReducer";
import {v1} from "uuid";
import {taskReducer, taskReducerInitialState} from "./reducers/taskReducer";

function App() {
    const [toDoListReducerState, toDoListReducerDispatch] = useReducer(toDoListReducer, toDoListReducerInitialState);
    const [taskReducerState, taskReducerDispatch] = useReducer(taskReducer, taskReducerInitialState);

    const addToDoList = (title: string) => {
        const action = addToDoListAC(v1(), title);
        toDoListReducerDispatch(action);
        taskReducerDispatch(action);
    };

    const mappedToDoLists = toDoListReducerState.map(tdl => {
        return (
            <ToDoList key={tdl.id}
                      toDoListId={tdl.id}
                      title={tdl.title}
                      tasks={taskReducerState[tdl.id]}
                      filterMethod={tdl.filterMethod}
                      toDoListReducerDispatch={toDoListReducerDispatch}
                      taskReducerDispatch={taskReducerDispatch}
                      date={'30.01.2024'}
            />
        )
    })

    return (
        <div className="App">
            <h1 className='creation-header'>Create To-Do list:</h1>
            <AddItemForm addItem={addToDoList}/>
            <div className="toDoLists-container">
                {mappedToDoLists.length ? mappedToDoLists : <span>There are no to-do lists yet.</span>}
            </div>
        </div>
    )
}

export default App;
