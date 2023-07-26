import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import { taskType } from './types/types';

const task1: taskType[] = [
  { id: 1, isDone: true, title: 'react' },
  { id: 2, isDone: false, title: 'ts' },
  { id: 3, isDone: true, title: 'css' },
]

function App() {
  return (
    <div className="App">
      <TodoList title='What to learn' tasks={task1} />
      <TodoList title='What to do' tasks={task1} />
    </div>
  );
}

export default App;
