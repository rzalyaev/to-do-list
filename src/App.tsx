import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import {Todolist} from './components/Todolist/Todolist';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Redux", isDone: true },
        { id: v1(), title: "ReactQuery", isDone: false }
    ])

    const addTask = (title: string) => {
        let task = {id: v1(), title: title, isDone: false};
        setTasks([task, ...tasks]);
    }

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(el => el.id !== taskId));
    }

    const changeTaskStatus = (id: string, isDone: boolean) => {
        let task = tasks.find(task => task.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks]);
        }
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks}
                      addTask={addTask}
                      removeTask={removeTask} changeTaskStatus={changeTaskStatus}/>
        </div>
    );
}

export default App;
