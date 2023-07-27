import React, { useState } from 'react';
import './TodoList.css';
import { FilterValuesType, taskType } from '../../types/types';
import { AddItemForm } from '../AddItemForm/AddItemForm';

type PropsType = {
  idList: string
  title: string,
  tasks: taskType[],
  removeTask: (id: string, idList: string) => void,
  changeFilter: (filter: FilterValuesType, idList: string) => void,
  addTask: (title: string, idList: string) => void,
  onCheckboxChange: (idTask: string, idList: string) => void,
  filter: FilterValuesType,
  removeList: (idList: string) => void
}

export const TodoList: React.FC<PropsType> = ({
  idList, title, tasks, filter, addTask, changeFilter,
  removeTask, onCheckboxChange, removeList
}) => {

  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState(null as string | null)

  const tasksElements = tasks.map(task =>
    <li key={task.id} className={task.isDone ? 'is-done' : ''}>
      <input type='checkbox' checked={task.isDone} onChange={() => onCheckboxChange(task.id, idList)} />
      <span>{task.title}</span>
      <button onClick={() => { removeTask(task.id, idList) }}>x</button>
    </li>
  )

  const handleAddTask = (inputValue: string) => {
    addTask(inputValue, idList)
  }

  const onInputValueChange = (e: React.FormEvent<HTMLInputElement>) => {
    setError(null)
    setInputValue(e.currentTarget.value)
  }

  return (
    <div className="todo">
      <div className='todo__list'>
        <div style={{ display: 'flex', alignItems: "center" }}>
          <h3>{title}</h3>
          <button onClick={() => removeList(idList)} >x</button>
        </div>
        <AddItemForm addItem={handleAddTask} />
        <ul>
          {tasksElements}
        </ul>
        <div>
          <button onClick={() => changeFilter('all', idList)}
            className={filter === 'all' ? 'active-filter' : ''}
          >
            All
          </button>
          <button onClick={() => changeFilter('active', idList)}
            className={filter === 'active' ? 'active-filter' : ''}
          >
            Active
          </button>
          <button onClick={() => changeFilter('completed', idList)}
            className={filter === 'completed' ? 'active-filter' : ''}
          >
            Completed
          </button>
        </div>
      </div>
    </div >
  );
}

