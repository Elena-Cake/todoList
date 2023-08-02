import React, { DragEvent, useState } from 'react';
import './TodoList.css';
import { FilterValuesType, taskType, todoListType } from '../../types/types';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { TitleEdit } from '../TitleEdit/TitleEdit';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';
import { Task } from './Task/Task';
import { useAppDispatch } from '../../store/store';
import { addTask, changeFilter, changeListTitle, changeSortTasks, changeTaskLocation, removeList, setListGhost, setListVisible } from '../../store/todoSlice';

type PropsType = {
  idList: string
  list: todoListType,
  tasks: taskType[],
  filter: FilterValuesType
  handleSetDragOverList: (idListOver: string) => void
  moveList: (idList: string) => void
}

export const TodoList: React.FC<PropsType> = ({
  idList, list, tasks, filter, handleSetDragOverList, moveList
}) => {

  const dispatch = useAppDispatch()

  const [idTaskDragOver, setIdTaskDragOver] = useState(null as string | null)
  const handleSetDragOverTask = (idTaskOver: string) => {
    if (idTaskOver !== idTaskDragOver) {
      setIdTaskDragOver(idTaskOver)
    }
  }
  const moveTask = (idTask: string) => {
    if (idTask !== idTaskDragOver && idTaskDragOver) {
      dispatch(changeTaskLocation({ idList: idList, idTaskMoved: idTask, idTaskOver: idTaskDragOver }))
    }
  }

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

  const dragLeaveHandler = (e: DragEvent<HTMLDivElement>, idListLeave: string) => {
    e.preventDefault()
    dispatch(setListVisible({ idList: idListLeave }))
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
  const tasksElements = tasks.map(task => {
    return <Task key={task.id}
      idList={idList} task={task}
      handleSetDragOverTask={handleSetDragOverTask}
      moveTask={moveTask}
    />
  })

  return (

    <Card
      className={`todo__list ${list.isGhost ? 'todo__list_type_ghost' : ''}`}
      draggable={true}
      onDragLeave={e => dragLeaveHandler(e, idList)}
      onDragOver={e => dragOverHandler(e, idList)}
      onDragEnd={e => dragEndHandler(e, idList)}

    >
      <h2> <TitleEdit title={list.title} editTitle={handleChangeTitle} /></h2>
      <Button onClick={() => dispatch(removeList({ idList }))} icon="pi pi-times" className="p-button-danger btn-close" />
      <AddItemForm addItem={handleAddTask} />
      <div className='card__sort'>
        <Button icon="pi pi-sort-alt" text severity="secondary" aria-label="Bookmark"
          style={{ 'width': '2rem', 'padding': '0', 'height': '2rem' }}
          onClick={() => { dispatch(changeSortTasks({ idList })) }}
        />
      </div>
      <ul className='list__tasks'>
        {tasksElements}
      </ul>
      <div className="card flex justify-content-center">
        <SelectButton value={value} onChange={handleChangeFilter} options={options} />
      </div>
    </Card >
  );
}


