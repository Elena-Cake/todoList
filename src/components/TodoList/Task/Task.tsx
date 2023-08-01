import React, { DragEvent } from 'react';
import { taskType } from '../../../types/types';
import { TitleEdit } from '../../TitleEdit/TitleEdit';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { useAppDispatch } from '../../../store/store';
import { changeCheckboxTask, changeTaskText, removeTask } from '../../../store/todoSlice';

type TaskPropsType = {
    task: taskType;
    idList: string;

    handleSetDragOverTask: (idTaskOver: string) => void
    moveTask: (idTask: string) => void
};

export const Task: React.FC<TaskPropsType> = ({ task, idList, handleSetDragOverTask, moveTask }) => {

    const dispatch = useAppDispatch()
    const handleChangeTask = (text: string) => {
        dispatch(changeTaskText({ text, idList, idTask: task.id }))
    };

    const dragStartHandler = (e: DragEvent<HTMLLIElement>, idList: string) => {
        // что взял
        // console.log('Start', idList)
    }
    const dragLeaveHandler = (e: DragEvent<HTMLLIElement>) => {
        e.preventDefault()
        // над чем был, но улетел
    }
    const dragOverHandler = (e: DragEvent<HTMLLIElement>, idTaskOver: string) => {
        e.preventDefault()
        handleSetDragOverTask(idTaskOver)
        // над чем летит
    }
    const dragEndHandler = (e: DragEvent<HTMLLIElement>, idTask: string) => {
        e.preventDefault()
        moveTask(idTask)
        // что бросил
    }

    return (
        <li
            key={task.id}
            className={`${task.isDone ? 'is-done' : ''} p-inputgroup edit-group`}

            draggable={true}
            onDragStart={e => dragStartHandler(e, task.id)}
            onDragLeave={e => dragLeaveHandler(e)}
            onDragOver={e => dragOverHandler(e, task.id)}
            onDragEnd={e => dragEndHandler(e, task.id)}
        >
            <span className="p-inputgroup-addon">
                <Checkbox checked={task.isDone} onChange={() => dispatch(changeCheckboxTask({ idTask: task.id, todoListsId: idList }))} />
            </span>
            <TitleEdit title={task.title} editTitle={handleChangeTask} />
            <Button icon="pi pi-times" className="p-button-danger" onClick={() => { dispatch(removeTask({ idTask: task.id, todoListsId: idList })) }} />
        </li>
    );
};
