import React, { useState } from 'react';
import './TodoList.css';
import { FilterValuesType, taskType } from '../../types/types';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { TitleEdit } from '../TitleEdit/TitleEdit';

type PropsType = {
  idList: string
  title: string,
  tasks: taskType[],
  removeTask: (id: string, idList: string) => void,
  changeFilter: (filter: FilterValuesType, idList: string) => void,
  addTask: (title: string, idList: string) => void,
  changeTask: (title: string, idList: string, idTask: string) => void,
  onCheckboxChange: (idTask: string, idList: string) => void,
  filter: FilterValuesType,
  removeList: (idList: string) => void,
  changeTitle: (title: string, idList: string) => void
}

export const TodoList: React.FC<PropsType> = ({
  idList, title, tasks, filter, addTask, changeFilter,
  removeTask, onCheckboxChange, removeList, changeTask,
  changeTitle
}) => {

  const tasksElements = tasks.map(task => {
    const handleChangeTask = (text: string) => {
      changeTask(text, idList, task.id)
    }
    return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
      <input type='checkbox' checked={task.isDone} onChange={() => onCheckboxChange(task.id, idList)} />
      <TitleEdit title={task.title} editTitle={handleChangeTask} />
      <button onClick={() => { removeTask(task.id, idList) }}>x</button>
    </li>
  })


  const handleAddTask = (inputValue: string) => {
    addTask(inputValue, idList)
  }

  const handleChangeTitle = (text: string) => {
    changeTitle(text, idList)
  }

  return (
    <div className="todo">
      <div className='todo__list'>
        <div style={{ display: 'flex', alignItems: "center" }}>
          <TitleEdit title={title} editTitle={handleChangeTitle} />
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

