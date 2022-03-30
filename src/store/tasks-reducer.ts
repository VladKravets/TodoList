import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {ActionAddTodolist, ActionRemoveTodolist} from "./todolist-reducer";

type RemoveTaskActionsType = {
    type: "REMOVE-TASK"
    todolistId: string
    taskId: string
}
type AddTaskActionsType = {
    type: "ADD-TASK"
    title: string
    todolistId: string
}
type ChangeTaskStatusType = {
    type: 'CHANGE-STATUS'
    isDone: boolean
    todolistId: string
    taskId: string
}
type ChangeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE'
    title: string
    todolistId: string
    taskId: string
}

export type ActionType =
    ActionAddTodolist
    | RemoveTaskActionsType
    | AddTaskActionsType
    | ChangeTaskStatusType
    | ChangeTaskTitleType
    | ActionRemoveTodolist

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(task => task.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTask = {id: v1(), title: action.title, isDone: false};
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case "CHANGE-STATUS": {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            let task = tasks.find(task => task.id === action.taskId);
            if (task) {
                task.isDone = action.isDone;
            }
            return stateCopy
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            let task = tasks.find(task => task.id === action.taskId);
            if (task) {
                task.title = action.title;
            }
            return stateCopy
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST":{
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }


        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionsType => {
    return {
        type: "REMOVE-TASK",
        todolistId: todolistId,
        taskId: taskId
    }
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionsType => {
    return {
        type: "ADD-TASK",
        title,
        todolistId,
    }
}
export const changeTaskStatusAC = (todolistId: string, isDone: boolean, taskId: string): ChangeTaskStatusType => {
    return {
        type: 'CHANGE-STATUS',
        isDone: false,
        todolistId,
        taskId
    }
}
export const changeTaskTitleAC = (todolistId: string, title: string, taskId: string): ChangeTaskTitleType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        title,
        todolistId,
        taskId
    }
}
