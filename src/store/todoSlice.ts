import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { v1 } from 'uuid'
import { FilterValuesType, taskType, todoListType } from '../types/types'


const idLists = [v1(), v1()]

const initialState = {
    todoLists: [
        { id: idLists[0], title: 'What to learn', filter: 'all' },
        { id: idLists[1], title: 'What to do', filter: 'all' },
    ] as todoListType[],
    tasks: {
        [idLists[0]]: [
            { id: v1(), isDone: true, title: 'react' },
            { id: v1(), isDone: false, title: 'ts' },
            { id: v1(), isDone: true, title: 'css' },
            { id: v1(), isDone: true, title: 'redux' },
        ] as taskType[],
        [idLists[1]]: [
            { id: v1(), isDone: false, title: 'learn' },
            { id: v1(), isDone: true, title: 'codding' },
        ] as taskType[]
    } as { [key: string]: taskType[] }
}

// export const getReport = createAsyncThunk(
//     'report/setReport',
//     async function (dates: [string, string]) {
//         // const response = await api.getReport(dates[0], dates[1])
//         // return response
//     }
// )

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        // lists
        addTodoList(state, action: PayloadAction<{ title: string }>) {
            const newTodoList = { id: v1(), title: action.payload.title, filter: 'all' as FilterValuesType };
            state.todoLists.push(newTodoList)
            state.tasks[newTodoList.id] = []
        },
        removeList(state, action: PayloadAction<{ idList: string }>) {
            state.todoLists = state.todoLists.filter(list => list.id !== action.payload.idList)
            delete state.tasks[action.payload.idList];
        },
        changeListTitle(state, action: PayloadAction<{ title: string, idList: string }>) {
            state.todoLists = state.todoLists.map(list => {
                if (list.id === action.payload.idList) { return { ...list, title: action.payload.title }; }
                return list
            })
        },
        changeFilter(state, action: PayloadAction<{ filter: FilterValuesType, todoListsId: string }>) {
            const todoList = state.todoLists.find(list => list.id === action.payload.todoListsId)
            if (todoList) {
                todoList.filter = action.payload.filter;
            }
        },
        // tasks
        addTask(state, action: PayloadAction<{ task: string, todoListsId: string }>) {
            state.tasks[action.payload.todoListsId] = [
                {
                    id: v1(), title: action.payload.task,
                    isDone: false
                },
                ...state.tasks[action.payload.todoListsId]
            ]
        },
        removeTask(state, action: PayloadAction<{ idTask: string, todoListsId: string }>) {
            state.tasks[action.payload.todoListsId] = state.tasks[action.payload.todoListsId].filter(task => task.id !== action.payload.idTask)
        },
        changeTaskText(state, action: PayloadAction<{ text: string, idList: string, idTask: string }>) {
            state.tasks[action.payload.idList] = state.tasks[action.payload.idList].map(task => {
                if (task.id === action.payload.idTask) { return { ...task, title: action.payload.text }; }
                return task
            })
        },
        changeCheckboxTask(state, action: PayloadAction<{ idTask: string, todoListsId: string }>) {
            state.tasks[action.payload.todoListsId] = state.tasks[action.payload.todoListsId].map(task => {
                if (task.id === action.payload.idTask) return { ...task, isDone: !task.isDone };
                return task;
            });
            // setTasks({ ...tasks, [todoListsId]: changedTasksList });
        }

    },
    extraReducers: (builder) => {
        // builder
        // .addCase(getReport.pending, (state) => {
        // })
        // .addCase(getReport.fulfilled, (state, action) => {

        // })
        // .addCase(getReport.rejected, (state) => {
        // })
    }
})
export const {
    addTodoList, removeList, changeListTitle, changeFilter,
    addTask, removeTask, changeTaskText, changeCheckboxTask
} = todoSlice.actions
export default todoSlice.reducer

