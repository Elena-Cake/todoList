import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'


type reportTotalType = {
    firstSeanceTime: string | null,
    lastSeanceTime: string | null,
    seanceCount: number | null,
    workTimeInSec: string | null
}
type Report = {
    date_start: string | null,
    date_end: string | null,
    dates: string | [string, string] | null,
    isLoading: boolean,
    error: string | null,
    info_message: string | null
}

const initialState: Report = {
    date_start: null,
    date_end: null,
    dates: null,
    isLoading: false,
    error: null,
    info_message: null,

}

export const getReport = createAsyncThunk(
    'report/setReport',
    async function (dates: [string, string]) {
        // const response = await api.getReport(dates[0], dates[1])
        // return response
    }
)

const todoSlice = createSlice({
    name: "report",
    initialState,
    reducers: {
        setDates(state, action: PayloadAction<{ date_start: string, date_end: string }>) {

        },
        setError(state, action: PayloadAction<string>) {

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getReport.pending, (state) => {
            })
            .addCase(getReport.fulfilled, (state, action) => {

            })
            .addCase(getReport.rejected, (state) => {
            })
    }
})
export const { setDates, setError } = todoSlice.actions
export default todoSlice.reducer

