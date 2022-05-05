import axios from 'axios'
import React, {useEffect, useState} from "react";

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
        let promise = instance.get(`todo-lists`)
        return promise
    },
    createTodolist(title: string) {
        let promise = instance.post(`todo-lists`, {title: "NEWNEWNEW"})
        return promise
    },
    deleteTodolist(todolistsId: string) {

        const todolistId = '';
        let promise = instance.delete(`todo-lists/${todolistsId}`)
        return promise
    },
    updateTodolistTitle(todolistsId:string,title:string) {
            const todolistId = ''
          let promise= instance.put(`todo-lists/${todolistsId}`, {title: 'Vlad cool man'})
    }
}



