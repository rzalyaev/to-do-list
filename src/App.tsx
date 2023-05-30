import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {Todolist} from './components/Todolist/Todolist';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistsType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]);

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    });

    const addTask = (title: string) => {
        let task = {id: v1(), title: title, isDone: false};
        setTasks([task, ...tasks]);
    }

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(el => el.id !== taskId));
    }

    const changeTaskStatus = (id: string, isDone: boolean) => {
        // let task = tasks.find(task => task.id === id);
        // if (task) {
        //     task.isDone = isDone;
        //     setTasks([...tasks]);
        // }
        setTasks(tasks.map(t => t.id === id ? {...t, isDone: isDone} : t))
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
