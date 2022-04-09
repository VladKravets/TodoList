import {todolistReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";
import {combineReducers, createStore} from "redux";

export const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer)

export type AppStoreType=typeof rootReducer



// @ts-ignore
window.store=store