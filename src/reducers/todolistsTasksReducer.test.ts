import {TaskListType, TodolistType} from "../App";
import {todolistsReducer, addTodolistAC} from "./todolistsReducer";
import {tasksReducer} from "./tasksReducer";
import {v1} from "uuid";

test('ids should be equals', () => {
  const startTasksState: TaskListType = {}
  const startTodolistsState: Array<TodolistType> = []

  const action = addTodolistAC(v1(), 'new todolist')

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.newTodolistId);
  expect(idFromTodolists).toBe(action.newTodolistId);
})