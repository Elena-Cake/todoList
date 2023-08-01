import React, { DragEvent, useEffect, useState } from 'react';
import './TodoList.css';
import { FilterValuesType, taskType, todoListType } from '../../types/types';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { TitleEdit } from '../TitleEdit/TitleEdit';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';
import { Task } from './Task/Task';
import { useAppDispatch } from '../../store/store';
import { addTask, changeFilter, changeListTitle, removeList, setListGhost, setListVisible } from '../../store/todoSlice';

type PropsType = {
  idList: string
  list: todoListType,
  tasks: taskType[],
  filter: FilterValuesType
  handleSetDragOverList: (idListOver: string) => void
  moveList: (idListOver: string) => void
}

export const TodoList: React.FC<PropsType> = ({
  idList, list, tasks, filter, handleSetDragOverList, moveList
}) => {

  const dispatch = useAppDispatch()

  const tasksElements = tasks.map(task => {
    return <Task key={task.id}
      idList={idList} task={task}
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
    dispatch(changeFilter({ filter: e.value, todoListsId: idList }))
  }

  const dragStartHandler = (e: DragEvent<HTMLDivElement>, idList: string) => {
    // что взял
    // console.log('Start', idList)
  }
  const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    dispatch(setListVisible({ idList }))
    // над чем был, но улетел
  }
  const dragOverHandler = (e: DragEvent<HTMLDivElement>, idListOver: string) => {
    e.preventDefault()
    handleSetDragOverList(idListOver)
    dispatch(setListGhost({ idList: idListOver }))
    // над чем летит
  }
  const dragEndHandler = (e: DragEvent<HTMLDivElement>, idList: string) => {
    e.preventDefault()
    moveList(idList)
    dispatch(setListVisible({ idList }))
    // что бросил
  }


  return (

    <Card
      className={`todo__list ${list.isGhost ? 'todo__list_type_ghost' : ''}`}
      draggable={true}
      onDragStart={e => dragStartHandler(e, idList)}
      onDragLeave={e => dragLeaveHandler(e)}
      onDragOver={e => dragOverHandler(e, idList)}
      onDragEnd={e => dragEndHandler(e, idList)}

    >
      <h2> <TitleEdit title={list.title} editTitle={handleChangeTitle} /></h2>
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


