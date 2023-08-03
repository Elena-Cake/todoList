import React, { useCallback, useState } from 'react';
import './TodoLists.css'
import { TodoList } from '../TodoList/TodoList';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { addTodoList, changeListsLocation, changeListsLocationDND } from '../../store/todoSlice';
import { todoListType } from '../../types/types';


export const TodoLists = () => {

    const dispatch = useAppDispatch()

    const todoLists = useAppSelector(state => state.todoLists.todoLists)
    const [lists, setLists] = useState(todoLists)

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

    const moveListDnD = useCallback((dragIndex: number, hoverIndex: number) => {
        dispatch(changeListsLocationDND({ dragIndex, hoverIndex }))
    }, [])

    const todoListsElements = todoLists.map((list, index) => {
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
                moveList={moveListDnD}
                index={index}
            />
        );
    });

    return (
        <>
            <div className='app__addlist'>
                <h1>Todo-List</h1>
                <AddItemForm addItem={handleAddTodoList} />
            </div>
            <div className='app__lists'>
                {todoListsElements}
            </div>
        </>
    );
};
