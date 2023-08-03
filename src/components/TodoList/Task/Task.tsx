import React, { DragEvent } from 'react';
import { taskType } from '../../../types/types';
import { TitleEdit } from '../../TitleEdit/TitleEdit';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { useAppDispatch } from '../../../store/store';
import { changeCheckboxTask, changeTaskText, removeTask } from '../../../store/todoSlice';

import type { Identifier, XYCoord } from 'dnd-core'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

type TaskPropsType = {
    task: taskType;
    idList: string;
    index: number
    handleSetDragOverTask: (idTaskOver: string) => void
    moveTask: (dragId: string, dragIndex: number, hoverIndex: number) => void
};

export const Task: React.FC<TaskPropsType> = ({
    task, idList, index, handleSetDragOverTask, moveTask
}) => {

    const dispatch = useAppDispatch()
    const handleChangeTask = (text: string) => {
        dispatch(changeTaskText({ text, idList, idTask: task.id }))
    };

    // const dragStartHandler = (e: DragEvent<HTMLLIElement>, idList: string) => {
    //     // что взял
    //     // console.log('Start', idList)
    // }
    // const dragLeaveHandler = (e: DragEvent<HTMLLIElement>) => {
    //     e.preventDefault()
    //     // над чем был, но улетел
    // }
    // const dragOverHandler = (e: DragEvent<HTMLLIElement>) => {
    //     e.preventDefault()
    //     getIdList()
    // над чем летит
    // }
    // const dragEndHandler = (e: DragEvent<HTMLLIElement>, idTask: string) => {
    //     e.preventDefault()
    //     moveTask(idTask)
    //     // что бросил
    // }


    const ref = useRef<HTMLLIElement>(null)
    interface DragItem {
        index: number
        id: string
        type: string
    }

    const [{ handlerId }, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: 'todoTaskType',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            // Determine rectangle on screen
            const hoverBoundingRectTask = ref.current?.getBoundingClientRect()

            // Get vertical middle
            const hoverMiddleTaskY =
                (hoverBoundingRectTask.bottom - hoverBoundingRectTask.top) / 2

            // Determine mouse position
            const clientOffset = monitor.getClientOffset()

            // Get pixels to the top
            const hoverClientTaskY = (clientOffset as XYCoord).y - hoverBoundingRectTask.top

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientTaskY < hoverMiddleTaskY) {
                return
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientTaskY > hoverMiddleTaskY) {
                return
            }

            // Time to actually perform the action
            moveTask(item.id, dragIndex, hoverIndex)

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: 'todoTaskType',
        item: { id: task.id, index },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    return (
        <li
            key={task.id}
            className={`${task.isDone ? 'is-done' : ''} p-inputgroup edit-group`}
            ref={ref}
            style={{ opacity }}
        // draggable={true}
        // onDragStart={e => dragStartHandler(e, task.id)}
        // onDragLeave={e => dragLeaveHandler(e)}
        // onDragOver={e => dragOverHandler(e)}
        // onDragEnd={e => dragEndHandler(e, task.id)}
        >

            <Checkbox checked={task.isDone} onChange={() => dispatch(changeCheckboxTask({ idTask: task.id, todoListsId: idList }))} />
            <TitleEdit title={task.title} editTitle={handleChangeTask} />
            <Button icon="pi pi-times" className="p-button-danger" onClick={() => { dispatch(removeTask({ idTask: task.id, todoListsId: idList })) }} />
        </li>
    );
};
