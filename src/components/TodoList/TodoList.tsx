import React, { useState } from 'react';
import './TodoList.css';
import { FilterValuesType, taskType } from '../../types/types';

type PropsType = {
  title: string,
  tasks: taskType[],
  removeTask: (id: string) => void,
  changeFilter: (filter: FilterValuesType) => void,
  addTask: (title: string) => void,
  onCheckboxChange: (id: string) => void
}

export const TodoList: React.FC<PropsType> = ({ title, tasks, addTask, changeFilter, removeTask, onCheckboxChange }) => {

  const [inputValue, setInputValue] = useState('')

  const tasksElements = tasks.map(task =>
    <li key={task.id}>
      <input type='checkbox' checked={task.isDone} onClick={() => onCheckboxChange(task.id)} />
      <span>{task.title}</span>
      <button onClick={() => { removeTask(task.id) }}>x</button>
    </li>
  )
  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addTask(inputValue)
    setInputValue('')
  }

  return (
    <div className="todo">
      <div className='todo__list'>
        <h3>{title}</h3>
        <form onSubmit={(e) => handleAddTask(e)}>
          <input value={inputValue} onChange={(e) => { setInputValue(e.target.value) }} />
          <button >+</button>
        </form>
        <ul>
          {tasksElements}
        </ul>
        <div>
          <button onClick={() => changeFilter('all')}>All</button>
          <button onClick={() => changeFilter('active')}>Active</button>
          <button onClick={() => changeFilter('completed')}>Completed</button>
        </div>
      </div>
    </div>
  );
}

