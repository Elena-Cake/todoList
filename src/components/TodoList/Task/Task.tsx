import React from 'react';
import { taskType } from '../../../types/types';
import { TitleEdit } from '../../TitleEdit/TitleEdit';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';

type TaskPropsType = {
    task: taskType;
    idList: string;
    onCheckboxChange: (idTask: string, idList: string) => void;
    changeTask: (title: string, idList: string, idTask: string) => void;
    removeTask: (id: string, idList: string) => void;
};

export const Task: React.FC<TaskPropsType> = ({ task, idList, onCheckboxChange, changeTask, removeTask }) => {
    const handleChangeTask = (text: string) => {
        changeTask(text, idList, task.id);
    };
    return (
        <li key={task.id} className={`${task.isDone ? 'is-done' : ''} p-inputgroup edit-group`}>
            <span className="p-inputgroup-addon">
                <Checkbox checked={task.isDone} onChange={() => onCheckboxChange(task.id, idList)} />
            </span>
            <TitleEdit title={task.title} editTitle={handleChangeTask} />
            <Button icon="pi pi-times" className="p-button-danger" onClick={() => { removeTask(task.id, idList); }} />
        </li>
    );
};
