import React from 'react';
import { taskType } from '../../../types/types';
import { TitleEdit } from '../../TitleEdit/TitleEdit';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { useAppDispatch } from '../../../store/store';
import { changeTaskText, removeTask } from '../../../store/todoSlice';

type TaskPropsType = {
    task: taskType;
    idList: string;
    onCheckboxChange: (idTask: string, idList: string) => void;
};

export const Task: React.FC<TaskPropsType> = ({ task, idList, onCheckboxChange }) => {

    const dispatch = useAppDispatch()
    const handleChangeTask = (text: string) => {
        dispatch(changeTaskText({ text, idList, idTask: task.id }))
    };


    return (
        <li key={task.id} className={`${task.isDone ? 'is-done' : ''} p-inputgroup edit-group`}>
            <span className="p-inputgroup-addon">
                <Checkbox checked={task.isDone} onChange={() => onCheckboxChange(task.id, idList)} />
            </span>
            <TitleEdit title={task.title} editTitle={handleChangeTask} />
            <Button icon="pi pi-times" className="p-button-danger" onClick={() => { dispatch(removeTask({ idTask: task.id, todoListsId: idList })) }} />
        </li>
    );
};
