import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type ActionRemoveTodolist = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type ActionAddTodolist = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string

}
type ActionChangeTodolistFilter = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    todolistId: string

}
type ActionChangeTDTitle = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string,
    id: string
}


const initialState: Array<TodolistType> = []
export type ActionType =
    ActionRemoveTodolist
    | ActionAddTodolist
    | ActionChangeTDTitle
    | ActionChangeTodolistFilter


export const todolistReducer = (state: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            return [...state, {id: action.todolistId, title: action.title, filter: 'all'}]
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id === action.todolistId
                ? {...el, filter: action.filter}
                : el)

        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        default:
            return state
    }
}

export const removeTodolistAC = (id: string): ActionRemoveTodolist => {
    return {
        type: "REMOVE-TODOLIST",
        id: id
    }
}
export const addTodolistAC = (newTodolistTitle: string): ActionAddTodolist => {
    return {
        type: "ADD-TODOLIST",
        title: newTodolistTitle,
        todolistId: v1()
    } as const
}
export const changeTodolistFilterAC = (newFilter: FilterValuesType, todolistId: string): ActionChangeTodolistFilter => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        filter: newFilter,
        todolistId
    }
}
export const changeTDTitleAC = (newTodolistTitle: string, id: string): ActionChangeTDTitle => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        title: newTodolistTitle,
        id
    }
}