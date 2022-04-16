import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {ActionAddTodolist, ActionRemoveTodolist} from './todolist-reducer';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    payload: {
        todolistId: string,
        taskId: string,
    },
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    payload: {
        title: string,
        todolistId: string,
    },
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    payload: {
        taskId: string,
        todolistId: string,
        isDone: boolean,
    },
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    payload: {
        taskId: string,
        todolistId: string,
        title: string,
    },
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType | ChangeTaskTitleActionType
    | ActionAddTodolist | ActionRemoveTodolist;

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.payload.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.payload.taskId)
            stateCopy[action.payload.todolistId] = filteredTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.payload.todolistId];
            const newTask = {id: v1(), title: action.payload.title, isDone: false};
            const newTasks = [newTask, ...tasks];
            stateCopy[action.payload.todolistId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.payload.todolistId]
            let newTasksArray = todolistTasks
                .map(t => t.id === action.payload.taskId
                    ? {...t, isDone: action.payload.isDone}
                    : t)
            state[action.payload.todolistId] = newTasksArray
            return ({...state})
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].map(t => t.id === action.payload.taskId
                        ? {...t, title: action.payload.title}
                        : t)
            }
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};

            stateCopy[action.todolistId] = [];

            return stateCopy;
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy;
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        payload: {todolistId, taskId},
    }
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {
        type: 'ADD-TASK',
        payload: {
            title,
            todolistId,
        }
    }
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            isDone,
            todolistId,
            taskId,
        }
    }
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            title,
            todolistId,
            taskId,
        }
    }
}

