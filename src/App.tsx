import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {Input} from "./components/Input/Input";
import {Button} from "./components/Button/Button";

export type FilterMethodType = 'All' | 'Active' | 'Completed'

type TodolistType = {
  id: string
  title: string
  initialFilterMethod: FilterMethodType
}
type TodolistsType = TodolistType[]

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

  // UseState hooks ----------------------------------------------------------------------------------------------------
  const [todolists, setTodolists]
      = useState<TodolistsType>(initialTodolists);
  const [taskList, setTaskList]
      = useState<TaskListType>(initialTaskList);
  const [currentTodolistTitle, setCurrentTodolistTitle]
      = useState<string>('');
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
  const addTodolist = (newTodolistTitle: string) => {
    if (isNewTodolistTitleValid(newTodolistTitle)) {
      const newTodolistId: string = v1()
      const newTodolist: TodolistType = {id: newTodolistId, title: newTodolistTitle.trim(), initialFilterMethod: "All"};
      setTodolists([...todolists, newTodolist]);
      setTaskList({...taskList, [newTodolistId]: []});
      setCurrentTodolistTitle('');
    }
  }
  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(t => t.id !== todolistId));
    delete(taskList[todolistId]);
  }

  // Event handlers ----------------------------------------------------------------------------------------------------
  const inputOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.trim().length > 0) {
      setErrorStatus('');
    }
    setCurrentTodolistTitle(event.currentTarget.value);
  }
  const buttonOnClickHandler = () => addTodolist(currentTodolistTitle);

  // To-do Lists mapping -----------------------------------------------------------------------------------------------
  const mappedTodolists = todolists.map(t => {
    return (
        <Todolist
            id={t.id}
            title={t.title}
            taskList={taskList}
            setTaskList={setTaskList}
            initialFilterMethod={t.initialFilterMethod}
            removeHandler={removeTodolist}
        />
    )
  })

  return (
      <div>
        <div className='headerWrapper'>
          <div className='header'>
            <h1>To-do List</h1>
            <div className='addTodolistForm'>
              <Input type={'text'}
                     value={currentTodolistTitle}
                     onChangeHandler={inputOnChangeHandler}
              />
              <Button title={'Add'} onClickHandler={buttonOnClickHandler} className={'addTodolistButton'}/>
              <div className='error'>{errorStatus}</div>
            </div>
          </div>
        </div>
        <div className={'todoWrapper'}>
          {mappedTodolists}
        </div>
      </div>
  );
}

export default App;
