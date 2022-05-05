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



