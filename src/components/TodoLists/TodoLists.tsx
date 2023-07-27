import React, { useState } from 'react';
import './TodoLists.css'
import { TodoList } from '../TodoList/TodoList';
import { FilterValuesType, taskType, todoListType } from '../../types/types';
import { v1 } from 'uuid';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { addTodoList } from '../../store/todoSlice';


export const TodoLists = () => {

    const dispatch = useAppDispatch()

    const todoLists = useAppSelector(state => state.todoLists.todoLists)
    const tasks = useAppSelector(state => state.todoLists.tasks)

    const onCheckboxChange = (idTask: string, todoListsId: string) => {
        const changedTasksList = tasks[todoListsId].map(task => {
            if (task.id === idTask) return { ...task, isDone: !task.isDone };
            return task;
        });
        // setTasks({ ...tasks, [todoListsId]: changedTasksList });
    };

    const changeFilter = (filter: FilterValuesType, todoListsId: string) => {
        let tl = todoLists.find(tl => tl.id === todoListsId);
        if (tl) {
            tl.filter = filter;
            // setTodoLists([...todoLists]);
        }
    };


    const handleAddTodoList = (title: string) => {
        dispatch(addTodoList({ title: title }))
    };

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
                title={list.title}
                tasks={tasksForTodoList}
                changeFilter={changeFilter}
                onCheckboxChange={onCheckboxChange}
                filter={list.filter} />
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
