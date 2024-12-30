import React, {useReducer} from 'react';
import './App.css';
import {v1} from "uuid";
import {ToDoList} from "./components/ToDoList";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {addToDoListAC, toDoListReducer, toDoList1Id, toDoList2Id, ToDoListState} from "./reducers/toDoListReducer";
import {createTaskArrayAC, taskReducer, TaskState} from "./reducers/taskReducer";

function App() {
    const toDoListReducerInitialState: ToDoListState = [
        {id: toDoList1Id, title: 'What to learn', filterMethod: 'all'},
        {id: toDoList2Id, title: 'What to buy', filterMethod: 'all'},
    ];

    const taskReducerInitialState: TaskState = {
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

    const [toDoListReducerState, dispatchToToDoListReducer] = useReducer(toDoListReducer, toDoListReducerInitialState);
    const [taskReducerState, dispatchToTaskReducer] = useReducer(taskReducer, taskReducerInitialState);

    const addToDoList = (title: string) => {
        const newToDoListId = v1();
        dispatchToToDoListReducer(addToDoListAC(newToDoListId, title));
        dispatchToTaskReducer(createTaskArrayAC(newToDoListId));
    };

    const mappedToDoLists = toDoListReducerState.map(tdl => {
        return (
            <ToDoList key={tdl.id}
                      toDoListId={tdl.id}
                      title={tdl.title}
                      tasks={taskReducerState[tdl.id]}
                      filterMethod={tdl.filterMethod}
                      dispatchToToDoListReducer={dispatchToToDoListReducer}
                      dispatchToTaskReducer={dispatchToTaskReducer}
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
