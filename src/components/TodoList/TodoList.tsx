import React, { useState } from 'react';
import './TodoList.css';
import { FilterValuesType, taskType } from '../../types/types';

type PropsType = {
  title: string,
  tasks: taskType[],
  removeTask: (id: string) => void,
  changeFilter: (filter: FilterValuesType) => void,
  addTask: (title: string) => void,
  onCheckboxChange: (id: string) => void,
  filter: FilterValuesType
}

export const TodoList: React.FC<PropsType> = ({ title, tasks, filter, addTask, changeFilter, removeTask, onCheckboxChange }) => {

  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState(null as string | null)

  const tasksElements = tasks.map(task =>
    <li key={task.id} className={task.isDone ? 'is-done' : ''}>
      <input type='checkbox' checked={task.isDone} onChange={() => onCheckboxChange(task.id)} />
      <span>{task.title}</span>
      <button onClick={() => { removeTask(task.id) }}>x</button>
    </li>
  )

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValue.trim() === '') {
      setError('empty task')
      return
    }
    addTask(inputValue)
    setError(null)
    setInputValue('')
  }

  const onInputValueChange = (e: React.FormEvent<HTMLInputElement>) => {
    setError(null)
    setInputValue(e.currentTarget.value)
  }

  return (
    <div className="todo">
      <div className='todo__list'>
        <h3>{title}</h3>
        <form onSubmit={handleAddTask}>
          <input value={inputValue}
            onChange={onInputValueChange}
            className={`${error ? 'error' : ''}`}
          />
          <button >+</button>
          <span className={`error-message`}>{error}</span>
        </form>
        <ul>
          {tasksElements}
        </ul>
        <div>
          <button onClick={() => changeFilter('all')}
            className={filter === 'all' ? 'active-filter' : ''}
          >
            All
          </button>
          <button onClick={() => changeFilter('active')}
            className={filter === 'active' ? 'active-filter' : ''}
          >
            Active
          </button>
          <button onClick={() => changeFilter('completed')}
            className={filter === 'completed' ? 'active-filter' : ''}
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  );
}

