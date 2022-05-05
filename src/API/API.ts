import axios from 'axios'

export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTasksResponseType = {
    error: string | null
    totalCount: number
    item: TaskType[]
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
        let promise = instance.delete<ResponseType<TodolistType>>(`todo-lists/${todolistsId}`)
        return promise
    },
    updateTodolistTitle(todolistsId: string, title: string) {
        const todolistId = ''
        let promise = instance.put<ResponseType<TodolistType>>(`todo-lists/${todolistsId}`, {title: 'Vlad cool man'})
    }
}

export const tasksAPI = {
    getTasks(todolistId: string) {
        let promise = instance.get<GetTasksResponseType>(`todo-lists/` + todolistId + `/tasks`)
        return promise
    },
    createTask(title: string) {
        let promise = instance.post<ResponseType<{ item: TaskType }>>(`todo-lists`, {title: "I created"})
        return promise
    },
    deleteTask(todolistId: string, taskId: string) {

        let promise = instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    },
    updateTaskTitle(todolistId: string, taskId: string, title: string) {
        let promise = instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, {title: 'Vlad cool man'})
        return promise
    }
}

