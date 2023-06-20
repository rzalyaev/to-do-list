import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import Todolist from './components/Todolist/Todolist';
import AddItemForm from './components/common/AddItemForm/AddItemForm';
import {Container, Grid, Paper} from "@mui/material";
import {Header} from "./components/Header";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistType = {
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

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
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
        const newTodolist: TodolistType = {id: newTodoId, title: newTodoTitle, filter: 'all'};
        setTodolists([...todolists, newTodolist]);
        setTasks({...tasks, [newTodoId]: []});
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId));
        delete tasks[todolistId];
        setTasks({...tasks});
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(todo => todo.id === todolistId ? {...todo, title} : todo));
    }

    const changeTodolistFilter = (todolistId: string, filter: FilterType) => {
        setTodolists(todolists.map(todo => todo.id === todolistId ? {...todo, filter} : todo));
    }

    const addTask = (todolistId: string, title: string) => {
        let newTask = {id: v1(), title, isDone: false};
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]});
    }

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)});
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task)
        });
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)
        });
    }

    return (
        <div className="App">
            <Header/>
            <Container fixed>
                <Grid container sx={{p: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
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
                                <Grid item>
                                    <Paper sx={{p: '10px'}}>
                                        <Todolist key={todolist.id}
                                                  id={todolist.id}
                                                  title={todolist.title}
                                                  filter={todolist.filter}
                                                  tasks={filterContainer()}

                                                  removeTodolist={removeTodolist}
                                                  changeTodolistTitle={changeTodolistTitle}
                                                  changeTodolistFilter={changeTodolistFilter}

                                                  addTask={addTask}
                                                  removeTask={removeTask}
                                                  changeTaskTitle={changeTaskTitle}
                                                  changeTaskStatus={changeTaskStatus}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
