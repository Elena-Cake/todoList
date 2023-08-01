import React, { useState } from 'react';
import './TodoLists.css'
import { TodoList } from '../TodoList/TodoList';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { addTodoList, changeListsLocation } from '../../store/todoSlice';


export const TodoLists = () => {

    const dispatch = useAppDispatch()

    const todoLists = useAppSelector(state => state.todoLists.todoLists)
    const tasks = useAppSelector(state => state.todoLists.tasks)

    const handleAddTodoList = (title: string) => {
        dispatch(addTodoList({ title: title }))
    };


    const [idListDragOver, setIdListDragOver] = useState(null as string | null)
    const handleSetDragOverList = (idListOver: string) => {
        if (idListDragOver !== idListOver) {
            setIdListDragOver(idListOver)
        }
    }

    const moveList = (idListMoved: string) => {
        if (idListMoved !== idListDragOver && idListDragOver) {
            dispatch(changeListsLocation({ idListMoved: idListMoved, idListOver: idListDragOver }))
        }
    }


    const todoListsElements = todoLists.map((list) => {
        let tasksForTodoList = tasks[list.id];

        if (list.filter === 'completed') {
            tasksForTodoList = tasks[list.id].filter(t => t.isDone);
        }
        if (list.filter === 'active') {
            tasksForTodoList = tasks[list.id].filter(t => !t.isDone);
        }
        return (
            <TodoList key={list.id}
                idList={list.id}
                list={list}
                tasks={tasksForTodoList}
                filter={list.filter}
                handleSetDragOverList={handleSetDragOverList}
                moveList={moveList}
            />
        );
    });

    return (
        <>
            <div className='app__addlist'>
                <AddItemForm addItem={handleAddTodoList} />
            </div>
            <div className='app__lists'>
                {todoListsElements}
            </div>
        </>
    );
};
