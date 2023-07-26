import React from 'react';
import './TodoList.css';
import { taskType } from '../../types/types';

type PropsType = {
  title: string,
  tasks: taskType[]
}

export const TodoList: React.FC<PropsType> = ({ title, tasks }) => {

  const tasksElements = tasks.map(task => {
    return (
      <li>
        <input type='checkbox' checked={task.isDone} />
        <span>{task.title}</span>
      </li>
    )
  })

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
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
      </div>
    </div>
  );
}

