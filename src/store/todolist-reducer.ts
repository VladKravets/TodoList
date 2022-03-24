import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type ActionRemoveTodolist = {
    type: "REMOVE-TODOLIST"
    id: string
}
type ActionAddTodolist = {
    type: "ADD-TODOLIST"
    title: string

}
type ActionChangeTodolistFilter = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    id: string

}
type ActionChangeTDTitle = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string,
    id: string

}
export type ActionType =
    ActionRemoveTodolist
    | ActionAddTodolist
    | ActionChangeTDTitle
    | ActionChangeTodolistFilter


export const todolistReducer = (todolists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodolistId = v1()
            return [...todolists,
                {id: newTodolistId, title: action.title, filter: "all"}
            ]
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        default:
            return todolists
    }
}

export const RemoveTodolistAC = (id: string): ActionRemoveTodolist => {
    return {
        type: "REMOVE-TODOLIST",
        id: id
    }
}
export const AddTodolistAC = (newTodolistTitle: string): ActionAddTodolist => {
    return {
        type: "ADD-TODOLIST",
        title: newTodolistTitle
    }
}
export const ChangeTodolistFilterAC = (newFilter: FilterValuesType, id: string): ActionChangeTodolistFilter => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        filter: newFilter,
        id
    }
}
export const ChangeTDTitleAC = (newTodolistTitle: string, id: string): ActionChangeTDTitle => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        title: newTodolistTitle,
        id
    }
}