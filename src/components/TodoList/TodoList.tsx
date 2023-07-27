import React, { useState } from 'react';
import './TodoList.css';
import { FilterValuesType, taskType } from '../../types/types';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { TitleEdit } from '../TitleEdit/TitleEdit';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';

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
    return <li key={task.id} className={`${task.isDone ? 'is-done' : ''} p-inputgroup edit-group`}>
      <span className="p-inputgroup-addon">
        <Checkbox checked={task.isDone} onChange={() => onCheckboxChange(task.id, idList)} />
      </span>
      <TitleEdit title={task.title} editTitle={handleChangeTask} />
      <Button icon="pi pi-times" className="p-button-danger" onClick={() => { removeTask(task.id, idList) }} />
    </li>
  })


  const handleAddTask = (inputValue: string) => {
    addTask(inputValue, idList)
  }

  const handleChangeTitle = (text: string) => {
    changeTitle(text, idList)
  }

  const options = ['all', 'active', 'completed'];
  const [value, setValue] = useState(options[0]);

  const handleChangeFilter = (e: SelectButtonChangeEvent) => {
    setValue(e.value)
    changeFilter(e.value, idList)
  }

  return (
    <div className="todo">
      <Card className='todo__list' >
        <TitleEdit title={title} editTitle={handleChangeTitle} />
        <Button onClick={() => removeList(idList)} icon="pi pi-times" className="p-button-danger" />
        <AddItemForm addItem={handleAddTask} />
        <ul>
          {tasksElements}
        </ul>
        <div className="card flex justify-content-center">
          <SelectButton value={value} onChange={handleChangeFilter} options={options} />
        </div>
      </Card >
    </div >
  );
}

