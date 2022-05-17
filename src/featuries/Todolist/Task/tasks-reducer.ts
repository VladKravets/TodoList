import {TasksStateType} from '../../../app/App';
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistType, TodolistDomainType,
} from '../todolists-reducer';
import {TaskStatuses, TaskType, todolistsAPI} from "../../../API/API";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../../app/store";
import {ThunkAction} from "redux-thunk";
import {setAppStatusAC, SetAppStatusType} from "../../../app/app-reducer";

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter(t => t.id != action.taskId)
            }
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId
                        ? {...t, status: action.status}
                        : t)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId
                        ? {...t, title: action.title}
                        : t)
            }
        }
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;

        case "SET-TODOLISTS": {
            const copyState = {...state};
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS':
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        default:
            return state;
    }
}


//ACTIONS
export const removeTaskAC = (taskId: string, todolistId: string) => ({
    type: 'REMOVE-TASK',
    taskId: taskId,
    todolistId: todolistId
} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => ({
    type: 'CHANGE-TASK-STATUS',
    status,
    todolistId,
    taskId
} as const)
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => ({
    type: 'CHANGE-TASK-TITLE',
    title,
    todolistId,
    taskId
} as const)
export const fetchTasksAC = (todolistId: string, tasks: TaskType[]) => ({type: 'SET-TASKS', tasks, todolistId} as const)


//THUNKS
export type ThunkTasksType = ThunkAction<void, TasksStateType, unknown, ActionsType>


export const fetchTasksTC = (todolistId: string):ThunkTasksType => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            const action = fetchTasksAC(todolistId, tasks)
            dispatch(action)
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string):ThunkTasksType => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(taskId, todolistId));
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const addTaskTC = (title: string, todolistId: string):ThunkTasksType => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTask(todolistId, title)
        .then((res) => {
            const newTask = res.data.data.item
            dispatch(addTaskAC(newTask))
            dispatch(setAppStatusAC('succeeded'))
        })
}
/*export const changeTaskTitleTC = (todolistId: string, taskId: string, newTitle: string) => {
    return (dispatch: Dispatch,getState:()=>AppRootStateType) => {
        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })
        if (task) {
            todolistsAPI.updateTask(todolistId, taskId, {
                title: newTitle,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status
            }).then(() => {
                const action = changeTaskTitleAC(newTitle, taskId, todolistId)
                dispatch(action)
            })
        }

    }
}*/
export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {

// так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
// те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком  // чтобы у неё отобрать остальные св-ва

    const allTasksFromState = getState().tasks;
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find(t => {
        return t.id === taskId
    })


    if (task) {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.updateTask(todolistId, taskId, {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: status
        }).then(() => {
            const action = changeTaskStatusAC(taskId, status, todolistId)
            dispatch(action)
            dispatch(setAppStatusAC('succeeded'))
        })
    }
}

//types
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistType
    | SetAppStatusType
    | ReturnType<typeof fetchTasksAC>

const initialState: TasksStateType = {
    count: []
}
