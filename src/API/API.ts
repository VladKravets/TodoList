import axios from 'axios'

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TasksPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TasksPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
type GetTasksResponseType = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '3bb1f301-4343-478c-bd6d-e432168f19d7'
    }
})
export const todolistAPI = {
    getTodolists() {
        let promise = instance.get<Array<TodolistType>>(`todo-lists`)
        return promise
    },
    createTodolist(title: string) {
        let promise = instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, {title: "NEWNEWNEW"})
        return promise
    },
    deleteTodolist(todolistsId: string) {

        const todolistId = '';
        let promise = instance.delete<ResponseType>(`todo-lists/${todolistsId}`)
        return promise
    },
    updateTodolistTitle(todolistsId: string, title: string) {
        const todolistId = ''
        let promise = instance.put<ResponseType>(`todo-lists/${todolistsId}`, {title: 'Vlad cool man'})
    }
}

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, taskTitle: string) {
        return instance.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

