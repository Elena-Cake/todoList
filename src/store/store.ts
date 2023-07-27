
import { combineReducers } from "redux"
import todoSlice from './todoSlice'
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk"
import { Action } from "redux"

const rootReducer = combineReducers({
    todoLists: todoSlice,
});

const store = configureStore({ reducer: rootReducer })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type TypedDispatch = ThunkDispatch<RootState, any, Action>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store