import React, { useEffect, useState } from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import { FilterValuesType, taskType } from './types/types';
import { v1 } from 'uuid';

const initTasks: taskType[] = [
  { id: v1(), isDone: true, title: 'react' },
  { id: v1(), isDone: false, title: 'ts' },
  { id: v1(), isDone: true, title: 'css' },
  { id: v1(), isDone: true, title: 'redux' },
]

function App() {

  const [tasks, setTasks] = useState<taskType[]>(initTasks)
  // const [tasksForTodoList, setTasksForTodoList] = useState<taskType[]>(tasks)
  const [filter, setFilter] = useState<FilterValuesType>('all')

  const addTask = (task: string) => {
    setTasks([{ id: v1(), title: task, isDone: false }, ...tasks])
  }
  const removeTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const onCheckboxChange = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) return { ...task, isDone: !task.isDone }
      return task
    }))
  }

  const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter)
  }

  // useEffect(() => {
  //   if (filter === 'all') {
  //     setTasksForTodoList(tasks)
  //   }
  //   if (filter === 'completed') {
  //     setTasksForTodoList(tasks.filter(t => t.isDone))
  //   }
  //   if (filter === 'active') {
  //     setTasksForTodoList(tasks.filter(t => !t.isDone))
  //   }
  // }, [tasks, filter])

  let tasksForTodoList = tasks
  if (filter === 'completed') {
    tasksForTodoList = tasks.filter(t => t.isDone)
  }
  if (filter === 'active') {
    tasksForTodoList = tasks.filter(t => !t.isDone)
  }

  return (
    <div className="App">
      <TodoList title='What to learn'
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        onCheckboxChange={onCheckboxChange} />
    </div>
  );
}

export default App;
