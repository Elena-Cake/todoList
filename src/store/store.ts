
import { combineReducers } from "redux"
import todoSlice from './todoSlice'
import { configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    report: todoSlice,
});

const store = configureStore({ reducer: rootReducer })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export default store