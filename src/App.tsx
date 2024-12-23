import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./components/ToDoList";
import {v1} from "uuid";

type ToDoList = {
    id: string
    title: string
    filterMethod: filterMethodType
    error: string
}

export type Task = {
    id: string
    title: string
    isDone: boolean
}
export type TaskList = {
    [key: string]: Task[]
}

export type filterMethodType = 'all' | 'active' | 'completed';

function App() {
    const toDoList1Id = v1();
    const toDoList2Id = v1();

    const [toDoLists, setToDoLists] = useState<ToDoList[]>([
        {id: toDoList1Id, title: 'What to learn', filterMethod: 'all', error: ''},
        {id: toDoList2Id, title: 'What to buy', filterMethod: 'all', error: ''},
    ]);

    const [tasks, setTasks] = useState<TaskList>({
        [toDoList1Id]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
            { id: v1(), title: 'Redux', isDone: false },
            { id: v1(), title: 'Typescript', isDone: false },
            { id: v1(), title: 'RTK query', isDone: false },
        ],
        [toDoList2Id]: []
    });

    const addTask = (toDoListId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false};
        setTasks({...tasks, [toDoListId]: [newTask, ...tasks[toDoListId]]});
    };
    const deleteTask = (toDoListId: string, taskId: string) => {
        setTasks({...tasks, [toDoListId]: tasks[toDoListId].filter(task => task.id !== taskId)});
    };
    const changeFilterMethod = (toDoListId: string, filterMethod: filterMethodType) => {
        setToDoLists(toDoLists.map(tdl => tdl.id === toDoListId ? {...tdl, filterMethod} : tdl));
    };

    const filterTasks = (tasks: Task[], filterMethod: filterMethodType): Task[] => {
        switch (filterMethod) {
            case 'active': return tasks.filter(task => !task.isDone);
            case 'completed': return tasks.filter(task => task.isDone);
            default: return tasks;
        }
    };

    const changeTaskCompletion = (toDoListId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [toDoListId]: tasks[toDoListId].map(task => task.id === taskId ? {...task, isDone} : task),
        })
    }

    const createError = (toDoListId: string, error: string) => {
        setToDoLists(toDoLists.map(tdl => toDoListId === tdl.id ? {...tdl, error} : tdl));
    }

    const mappedToDoLists = toDoLists.map(tdl => {
        return (
            <ToDoList id={tdl.id}
                      title={tdl.title}
                      tasks={tasks[tdl.id]}
                      addTask={addTask}
                      deleteTask={deleteTask}
                      filterMethod={tdl.filterMethod}
                      filterTasks={filterTasks}
                      changeFilterMethod={changeFilterMethod}
                      changeTaskCompletion={changeTaskCompletion}
                      error={tdl.error}
                      createError={createError}
                      date={'30.01.2024'}
            />
        )
    })

    return (
        <div className="App">
            {mappedToDoLists}
        </div>
    )
}

export default App;
