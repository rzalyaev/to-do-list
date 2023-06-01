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
    const todolistID1 = v1();
    const todolistID2 = v1();

    const [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]);

    const [tasks, setTasks] = useState<TasksStateType>({
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

    const addTodolist = (newTodoTitle: string) => {
        const newTodoId = v1();
        const newTodolist: TodolistsType = {id: newTodoId, title: newTodoTitle, filter: 'all'};
        setTodolists([...todolists, newTodolist]);
        setTasks({...tasks, [newTodoId]: []});
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId));
        delete tasks[todolistId];
        setTasks({...tasks});
    }

    const changeFilter = (todolistId: string, filterMethod: FilterType) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {
            ...todolist,
            filter: filterMethod
        } : todolist));
    }

    const addTask = (todolistId: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]});
    }

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)});
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone: isDone} : task)
        });
    }

    return (
        <div className="App">
            {
                todolists.map(todolist => {
                    const filterContainer = () => {
                        let currentTasks = tasks[todolist.id];

                        if (todolist.filter === 'active') {
                            currentTasks = tasks[todolist.id].filter(task => !task.isDone);
                        }
                        if (todolist.filter === 'completed') {
                            currentTasks = tasks[todolist.id].filter(task => task.isDone);
                        }
                        return currentTasks;
                    }

                    return (
                        <Todolist key={todolist.id}
                                  id={todolist.id}
                                  title={todolist.title}
                                  filter={todolist.filter}
                                  tasks={filterContainer()}
                                  removeTodolist={removeTodolist}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  removeTask={removeTask}
                                  changeTaskStatus={changeTaskStatus}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
