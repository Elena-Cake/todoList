import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { v1 } from 'uuid'
import { taskType, todoListType } from '../types/types'


// type reportTotalType = {
//     firstSeanceTime: string | null,
//     lastSeanceTime: string | null,
//     seanceCount: number | null,
//     workTimeInSec: string | null
// }
// type Report = {
//     date_start: string | null,
//     date_end: string | null,
//     dates: string | [string, string] | null,
//     isLoading: boolean,
//     error: string | null,
//     info_message: string | null
// }


const initialState = {}
// const initialState: Report = {
//     date_start: null,
//     date_end: null,
//     dates: null,
//     isLoading: false,
//     error: null,
//     info_message: null,

// }

// export const getReport = createAsyncThunk(
//     'report/setReport',
//     async function (dates: [string, string]) {
//         // const response = await api.getReport(dates[0], dates[1])
//         // return response
//     }
// )

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

const todoSlice = createSlice({
    name: "report",
    initialState,
    reducers: {
        // setDates(state, action: PayloadAction<{ date_start: string, date_end: string }>) {

        // }
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
// export const { setDates } = todoSlice.actions
export default todoSlice.reducer

