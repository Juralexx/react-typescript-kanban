import { combineReducers } from 'redux'
import userReducer from './user.reducer'
import tasksReducer from './tasks.reducer'
import activitiesReducer from './activities.reducer'

// import { composeWithDevTools } from "@redux-devtools/extension"
import { configureStore } from "@reduxjs/toolkit"
// import { applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from "redux-thunk"
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const rootReducer = combineReducers({
    userReducer,
    tasksReducer,
    activitiesReducer
})

const logger = createLogger({
    collapsed: true
})

const middlewares = [thunk, logger]

export const store = configureStore({
    reducer: rootReducer,
    middleware: middlewares,
    // enhancers: [applyMiddleware(...middlewares)],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector