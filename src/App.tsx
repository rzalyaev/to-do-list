import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";

type TaskType = {
  id: number
  title: string
  isDone: boolean
}

export type TasksType = TaskType[]

function App() {
  const tasks1: TasksType = [
    {id: 1, title: "HTML&CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "ReactJS", isDone: false},
    {id: 4, title: 'Redux', isDone: false},
    {id: 5, title: 'TypeScript', isDone: false},
    {id: 6, title: 'RTK Query', isDone: false}
  ]

  const tasks2: TasksType = []

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
