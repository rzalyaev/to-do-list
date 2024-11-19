import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./components/ToDoList";

export type Task = {
    id: number;
    title: string;
    isDone: boolean;
}
export type TaskList = Task[]

export type filterMethodType = 'all' | 'active' | 'completed';

function App() {
    const initialTasks: TaskList = [
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
        { id: 4, title: 'Redux', isDone: false },
        { id: 5, title: 'Typescript', isDone: false },
        { id: 6, title: 'RTK query', isDone: false },
    ];

    const [tasks, setTasks] = useState<TaskList>(initialTasks);
    const [filterMethod, setFilterMethod] = useState<filterMethodType>('all');

    const deleteTask = (id: number) => setTasks(tasks.filter(task => task.id !== id));
    const changeFilterMethod = (reqFilterMethod: filterMethodType) => setFilterMethod(reqFilterMethod);

    const filterTasks = (): TaskList => {
        switch (filterMethod) {
            case 'active': return tasks.filter(task => !task.isDone);
            case 'completed': return tasks.filter(task => task.isDone);
            default: return tasks;
        }
    }

    return (
        <div className="App">
            <ToDoList title={'What to learn'}
                      tasks={filterTasks()}
                      deleteTask={deleteTask}
                      changeFilterMethod={changeFilterMethod}
                      date={'30.01.2024'}
            />
        </div>
    )
}

export default App;
