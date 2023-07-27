import React, { useState } from 'react';
import './TodoList.css';
import { FilterValuesType, taskType } from '../../types/types';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { TitleEdit } from '../TitleEdit/TitleEdit';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';
import { Task } from './Task/Task';
import { useAppDispatch } from '../../store/store';
import { addTask, changeListTitle, removeList } from '../../store/todoSlice';

type PropsType = {
  idList: string
  title: string,
  tasks: taskType[],
  changeFilter: (filter: FilterValuesType, idList: string) => void,
  onCheckboxChange: (idTask: string, idList: string) => void,
  filter: FilterValuesType
}

export const TodoList: React.FC<PropsType> = ({
  idList, title, tasks, filter, changeFilter,
  onCheckboxChange
}) => {

  const dispatch = useAppDispatch()
  const tasksElements = tasks.map(task => {
    return <Task
      idList={idList} task={task}
      onCheckboxChange={onCheckboxChange}
    />
  })


  const handleAddTask = (inputValue: string) => {
    dispatch(addTask({ task: inputValue, todoListsId: idList }))
  }

  const handleChangeTitle = (text: string) => {
    dispatch(changeListTitle({ title: text, idList }))
  }

  const options = ['all', 'active', 'completed'];
  const [value, setValue] = useState(options[0]);

  const handleChangeFilter = (e: SelectButtonChangeEvent) => {
    setValue(e.value)
    changeFilter(e.value, idList)
  }

  return (
    <Card className='todo__list' >
      <h2> <TitleEdit title={title} editTitle={handleChangeTitle} /></h2>
      <Button onClick={() => dispatch(removeList({ idList }))} icon="pi pi-times" className="p-button-danger btn-close" />
      <AddItemForm addItem={handleAddTask} />
      <ul>
        {tasksElements}
      </ul>
      <div className="card flex justify-content-center">
        <SelectButton value={value} onChange={handleChangeFilter} options={options} />
      </div>
    </Card >
  );
}


