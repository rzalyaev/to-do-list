import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu} from '@mui/icons-material';
import {
  addTodolistAC,
  changeTodolistFilterMethodAC,
  changeTodolistTitleAC,
  removeTodolistAC
} from "./reducers/todolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";

export type FilterMethodType = 'All' | 'Active' | 'Completed';

export type TodolistType = {
  id: string
  title: string
  filterMethod: FilterMethodType
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
  // Hooks -------------------------------------------------------------------------------------------------------------
  const [currentTodolistTitle, setCurrentTodolistTitle] = useState<string>('');
  const [errorStatus, setErrorStatus] = useState<string>('');
  const todolists = useSelector<AppRootStateType, TodolistsType>(state => state.todolists);
  const taskList = useSelector<AppRootStateType, TaskListType>(state => state.tasks);
  const dispatch = useDispatch();

  // Error checking ----------------------------------------------------------------------------------------------------
  const validateNewTodolistTitle = (newTodolistTitle: string) => {
    if (newTodolistTitle.trim().length > 0) {
      return true;
    } else {
      setErrorStatus('Title is required');
      return false;
    }
  }

  // CRUD operations ---------------------------------------------------------------------------------------------------
  const addTodolistByClickOnButton = (newTodolistTitle: string) => {
    if (validateNewTodolistTitle(newTodolistTitle)) {
      dispatch(addTodolistAC(v1(), newTodolistTitle));
      setCurrentTodolistTitle('');
    }
  }
  const addTodolistByPressEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTodolistByClickOnButton(currentTodolistTitle);
    }
  }
  const removeTodolist = (todolistId: string) => {
    dispatch(removeTodolistAC(todolistId));
  }
  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispatch(changeTodolistTitleAC(todolistId, title));
  }
  const changeTodolistFilterMethod = (todolistId: string, newFilterMethod: FilterMethodType) => {
    dispatch(changeTodolistFilterMethodAC(todolistId, newFilterMethod));
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
    const handleChangeTodolistFilterMethod = (newFilterMethod: FilterMethodType) =>
        changeTodolistFilterMethod(t.id, newFilterMethod);
    return (
        <Todolist
            id={t.id}
            title={t.title}
            taskList={taskList}
            dispatch={dispatch}
            filterMethod={t.filterMethod}
            handleRemoveTodolist={handleRemoveTodolist}
            handleChangeTodolistTitle={handleChangeTodolistTitle}
            handleChangeTodolistFilterMethod={handleChangeTodolistFilterMethod}
        />
    );
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
