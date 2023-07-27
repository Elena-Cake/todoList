import React, { useState } from 'react';
import './TodoLists.css'
import { TodoList } from '../TodoList/TodoList';
import { FilterValuesType, taskType, todoListType } from '../../types/types';
import { v1 } from 'uuid';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { useAppSelector } from '../../store/store';

const initTasks: taskType[] = [
    { id: v1(), isDone: true, title: 'react' },
    { id: v1(), isDone: false, title: 'ts' },
    { id: v1(), isDone: true, title: 'css' },
    { id: v1(), isDone: true, title: 'redux' },
]
const initTasks2: taskType[] = [
    { id: v1(), isDone: false, title: 'learn' },
    { id: v1(), isDone: true, title: 'codding' },
]

const idList1 = v1()
const idList2 = v1()
const initTodoLists: todoListType[] = [
    { id: idList1, title: 'What to learn', filter: 'all' },
    { id: idList2, title: 'What to do', filter: 'all' },
]

export const TodoLists = () => {

    const todoLists = useAppSelector(state => state.todoLists.initTodoLists)
    const tasks = useAppSelector(state => state.todoLists.tasks)

    const addTask = (task: string, todoListsId: string) => {
        tasks[todoListsId] = [{ id: v1(), title: task, isDone: false }, ...tasks[todoListsId]];
        // setTasks({ ...tasks });
    };
    const removeTask = (idTask: string, todoListsId: string) => {
        const filteredTasks = tasks[todoListsId].filter(task => task.id !== idTask);
        // setTasks({ ...tasks, [todoListsId]: filteredTasks });
    };

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

    const changeTask = (text: string, idList: string, idTask: string) => {
        const newTasks = tasks[idList].map(task => {
            if (task.id === idTask) { return { ...task, title: text }; }
            else { return task; }
        });
        // setTasks({ ...tasks, [idList]: newTasks });
    };

    const changeTitle = (title: string, idList: string) => {
        // setTodoLists(todoLists.map(list => {
        //     if (list.id === idList) { return { ...list, title: title }; }
        //     else { return list; }
        // }));
    };

    const removeList = (idList: string) => {
        // setTodoLists(todoLists.filter(list => list.id !== idList));
        delete tasks[idList];
        // setTasks({ ...tasks });
    };

    const addTodoList = (title: string) => {
        const newTodoList = { id: v1(), title: title, filter: 'all' as FilterValuesType };
        // setTodoLists([newTodoList, ...todoLists]);
        // setTasks({ [newTodoList.id]: [], ...tasks });
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
                removeTask={removeTask}
                changeFilter={changeFilter}
                onCheckboxChange={onCheckboxChange}
                filter={list.filter}
                removeList={removeList}
                changeTask={changeTask}
                changeTitle={changeTitle} />
        );
    });

    return (
        <>
            <div className='app__addlist'>
                <AddItemForm addItem={addTodoList} />
            </div>
            <div className='app__lists'>
                {todoListsElements}
            </div>
        </>
    );
};
