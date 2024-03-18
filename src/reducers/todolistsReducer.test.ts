import {
  addTodolistAC,
  changeTodolistFilterMethodAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer
} from './todolistsReducer';
import {FilterMethodType, TodolistType} from '../App';
import { v1 } from 'uuid';

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistType>

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()
  startState = [
    {id: todolistId1, title: 'What to learn', filterMethod: 'All'},
    {id: todolistId2, title: 'What to buy', filterMethod: 'All'}
  ]
});

test('correct todolist should be removed', () => {
  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
  let newTodolistTitle = 'New Todolist'

  const endState = todolistsReducer(startState, addTodolistAC(v1(), newTodolistTitle));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
  let newTodolistTitle = 'New Todolist'

  const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle));

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
});

test('correct filter of todolist should be changed', () => {
  let newFilter: FilterMethodType = 'Completed';

  const endState = todolistsReducer(startState, changeTodolistFilterMethodAC(todolistId2, newFilter))

  expect(endState[0].filterMethod).toBe('All');
  expect(endState[1].filterMethod).toBe(newFilter)
});