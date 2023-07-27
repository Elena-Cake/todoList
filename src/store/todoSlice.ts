import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { v1 } from 'uuid'
import { taskType, todoListType } from '../types/types'


const idLists = [v1(), v1()]

const initialState = {
    initTodoLists: [
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
    }
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
        addTask(state, action: PayloadAction<{ task: string, todoListsId: string }>) {
            state.tasks[action.payload.todoListsId] = [
                {
                    id: v1(), title: action.payload.task,
                    isDone: false
                },
                ...state.tasks[action.payload.todoListsId]
            ]
        },

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
export const { addTask } = todoSlice.actions
export default todoSlice.reducer

