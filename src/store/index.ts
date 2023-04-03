import { configureStore, combineReducers } from '@reduxjs/toolkit'
import application from './application/slice'

const reducers = {
	application
}

export const allReducers = combineReducers(reducers)

const store = configureStore({
	reducer: reducers
})

export type IAppState = ReturnType<typeof allReducers>

export default store
