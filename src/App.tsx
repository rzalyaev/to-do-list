import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {ToDoList} from "./components/ToDoList";
import {v1} from "uuid";

export type Task = {
    id: string;
    title: string;
    isDone: boolean;
}
export type TaskList = Task[]

export type filterMethodType = 'all' | 'active' | 'completed';

function App() {
    const initialTasks: TaskList = [
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
        { id: v1(), title: 'Redux', isDone: false },
        { id: v1(), title: 'Typescript', isDone: false },
        { id: v1(), title: 'RTK query', isDone: false },
    ];

    const [tasks, setTasks] = useState<TaskList>(initialTasks);
    const [filterMethod, setFilterMethod] = useState<filterMethodType>('all');
    const [error, setError] = useState<string | null>(null);

    const addTask = (title: string) => {
        const newTask = {id: v1(), title, isDone: false};
        setTasks([...tasks, newTask]);
    }
    const deleteTask = (id: string) => setTasks(tasks.filter(task => task.id !== id));
    const changeFilterMethod = (reqFilterMethod: filterMethodType) => setFilterMethod(reqFilterMethod);

    const filterTasks = (): TaskList => {
        switch (filterMethod) {
            case 'active': return tasks.filter(task => !task.isDone);
            case 'completed': return tasks.filter(task => task.isDone);
            default: return tasks;
        }
    }

    const changeTaskCompletion = (id: string, isDone: boolean) => setTasks(tasks.map(task => {
        return task.id === id ? {...task, isDone} : task;
    }))

    const createError = (newError: string) => setError(newError);

    return (
        <div className="App">
            <ToDoList title={'What to learn'}
                      tasks={filterTasks()}
                      addTask={addTask}
                      deleteTask={deleteTask}
                      filterMethod={filterMethod}
                      changeFilterMethod={changeFilterMethod}
                      changeTaskCompletion={changeTaskCompletion}
                      error={error}
                      createError={createError}
                      date={'30.01.2024'}
            />
        </div>
    )
}

export default App;
