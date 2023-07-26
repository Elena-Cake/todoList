import React, { useEffect, useState } from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import { FilterValuesType, taskType, todoListType } from './types/types';
import { v1 } from 'uuid';

const initTasks: taskType[] = [
  { id: v1(), isDone: true, title: 'react' },
  { id: v1(), isDone: false, title: 'ts' },
  { id: v1(), isDone: true, title: 'css' },
  { id: v1(), isDone: true, title: 'redux' },
]

const initTodoLists: todoListType[] = [
  { id: v1(), title: 'What to learn', filter: 'all', tasks: initTasks },
  { id: v1(), title: 'What to do', filter: 'active', tasks: initTasks },
]

function App() {

  const [todoLists, setTodoLists] = useState<todoListType[]>(initTodoLists)
  const [tasks, setTasks] = useState<taskType[]>(initTasks)
  // const [tasksForTodoList, setTasksForTodoList] = useState<taskType[]>(tasks)

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

  const changeFilter = (filter: FilterValuesType, todoListsId: string) => {
    let tl = todoLists.find(tl => tl.id === todoListsId)
    if (tl) {
      tl.filter = filter
      setTodoLists([...todoLists])
    }
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



  const todoListsElements = todoLists.map((list) => {
    let tasksForTodoList = list.tasks
    if (list.filter === 'completed') {
      tasksForTodoList = list.tasks.filter(t => t.isDone)
    }
    if (list.filter === 'active') {
      tasksForTodoList = list.tasks.filter(t => !t.isDone)
    }

    return (
      <TodoList key={list.id}
        idList={list.id}
        title={list.title}
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        onCheckboxChange={onCheckboxChange}
        filter={list.filter}
      />
    )
  })

  return (
    <div className="App">
      {todoListsElements}
    </div>
  );
}

export default App;
