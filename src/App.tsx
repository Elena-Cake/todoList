import React, { useEffect, useState } from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import { FilterValuesType, taskType } from './types/types';

const initTasks: taskType[] = [
  { id: 1, isDone: true, title: 'react' },
  { id: 2, isDone: false, title: 'ts' },
  { id: 3, isDone: true, title: 'css' },
  { id: 4, isDone: true, title: 'redux' },
]

function App() {

  const [tasks, setTasks] = useState<taskType[]>(initTasks)
  const [tasksForTodoList, setTasksForTodoList] = useState<taskType[]>(tasks)
  const [filter, setFilter] = useState<FilterValuesType>('all')

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter)
  }

  useEffect(() => {
    if (filter === 'all') {
      setTasksForTodoList(tasks)
    }
    if (filter === 'completed') {
      setTasksForTodoList(tasks.filter(t => t.isDone))
    }
    if (filter === 'active') {
      setTasksForTodoList(tasks.filter(t => !t.isDone))
    }
  }, [tasks, filter])


  return (
    <div className="App">
      <TodoList title='What to learn'
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter} />
      <TodoList title='What to do'
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter} />
    </div>
  );
}

export default App;
