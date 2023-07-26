import React from 'react';
import './TodoList.css';
import { FilterValuesType, taskType } from '../../types/types';

type PropsType = {
  title: string,
  tasks: taskType[],
  removeTask: (id: number) => void,
  changeFilter: (filter: FilterValuesType) => void
}

export const TodoList: React.FC<PropsType> = ({ title, tasks, changeFilter, removeTask }) => {



  const tasksElements = tasks.map(task =>
    <li>
      <input type='checkbox' checked={task.isDone} />
      <span>{task.title}</span>
      <button onClick={() => { removeTask(task.id) }}>x</button>
    </li>
  )

  return (
    <div className="todo">
      <div className='todo__list'>
        <h3>{title}</h3>
        <div>
          <input />
          <button>+</button>
        </div>
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

