import React, {ChangeEvent, KeyboardEvent, useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import { Menu } from '@mui/icons-material';
import {
  addTodolistAC, changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
  TodolistsReducerActionTypes
} from "./reducers/todolistsReducer";
import {tasksReducer, TasksReducerActionTypes} from "./reducers/tasksReducer";

export type FilterMethodType = 'All' | 'Active' | 'Completed'

export type TodolistType = {
  id: string
  title: string
  initialFilterMethod: FilterMethodType
}
export type TodolistsType = TodolistType[]

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type TaskListType = {
  [key: string]: TaskType[]
}

function App() {
  const todolist1Id = v1();
  const todolist2Id = v1();
  const initialTodolists: TodolistsType = [
    {id: todolist1Id, title: 'What to learn', initialFilterMethod: "All"},
    {id: todolist2Id, title: 'What to buy', initialFilterMethod: "All"}
  ];

  const initialTaskList: TaskListType = {
    [todolist1Id]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: 'Redux', isDone: false},
      {id: v1(), title: 'TypeScript', isDone: false},
      {id: v1(), title: 'RTK Query', isDone: false}
    ],
    [todolist2Id]: [
      {id: v1(), title: 'Milk', isDone: false},
      {id: v1(), title: 'Bread', isDone: false},
      {id: v1(), title: 'Water', isDone: true},
      {id: v1(), title: 'Butter', isDone: false}
    ]
  }

  // Hooks ----------------------------------------------------------------------------------------------------
  const [todolists, dispatchTodolists] = useReducer(todolistsReducer, initialTodolists);
  const [taskList, dispatchTaskList] = useReducer(tasksReducer, initialTaskList);
  const [currentTodolistTitle, setCurrentTodolistTitle] = useState<string>('');
  const [errorStatus, setErrorStatus] = useState<string>('');

  // Error checking ----------------------------------------------------------------------------------------------------
  const isNewTodolistTitleValid = (newTodolistTitle: string) => {
    if (newTodolistTitle.trim().length > 0) {
      return true;
    } else {
      setErrorStatus('Title is required');
      return false;
    }
  }

  // CRUD operations ---------------------------------------------------------------------------------------------------
  const addTodolistByClickOnButton = (newTodolistTitle: string) => {
    if (isNewTodolistTitleValid(newTodolistTitle)) {
      const newTodolistId: string = v1()
      dispatchTodolists(addTodolistAC(newTodolistId, newTodolistTitle));
      dispatchTaskList(addTodolistAC(newTodolistId, newTodolistTitle));
      setCurrentTodolistTitle('');
    }
  }
  const addTodolistByPressEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTodolistByClickOnButton(currentTodolistTitle);
    }
  }
  const removeTodolist = (todolistId: string) => {
    dispatchTodolists(removeTodolistAC(todolistId));
    dispatchTaskList(removeTodolistAC(todolistId));
  }
  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispatchTodolists(changeTodolistTitleAC(todolistId, title));
  }

  // Event handlers ----------------------------------------------------------------------------------------------------
  const handleInputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.trim().length > 0) {
      setErrorStatus('');
    }
    setCurrentTodolistTitle(event.currentTarget.value);
  }
  const handleInputOnKeyUp = (event: KeyboardEvent<HTMLInputElement>) => addTodolistByPressEnter(event);
  const handleButtonOnClick = () => addTodolistByClickOnButton(currentTodolistTitle);

  // To-do Lists mapping -----------------------------------------------------------------------------------------------
  const mappedTodolists = todolists.map(t => {
    const handleRemoveTodolist = () => removeTodolist(t.id);
    const handleChangeTodolistTitle = (title: string) => changeTodolistTitle(t.id, title);
    return (
        <Todolist
            id={t.id}
            title={t.title}
            taskList={taskList}
            dispatchTaskList={dispatchTaskList}
            initialFilterMethod={t.initialFilterMethod}
            handleRemoveTodolist={handleRemoveTodolist}
            handleChangeTodolistTitle={handleChangeTodolistTitle}
        />
    )
  })

  return (
      <div>
        <AppBar position={'static'}>
          <Toolbar sx={{width: '1200px', margin: '0 auto'}}>
            <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
              <Menu/>
            </IconButton>
            <Typography variant={'h6'} sx={{flexGrow: 1, mr: 2}}>
              Todolist
            </Typography>
            <Button color={'inherit'}>Login</Button>
          </Toolbar>
        </AppBar>
        <Container fixed sx={{padding: '20px 0'}}>
          <AddItemForm type={'text'}
                       value={currentTodolistTitle}
                       onChangeHandler={handleInputOnChange}
                       onKeyUpHandler={handleInputOnKeyUp}
                       placeholder={'Enter to-do list title...'}
                       title={'Add'}
                       onClickHandler={handleButtonOnClick}
                       errorStatus={errorStatus}
          />
          <Grid container sx={{marginTop: '10px',gap: '15px'}}>
            {mappedTodolists}
          </Grid>
        </Container>
      </div>
  );
}

export default App;
