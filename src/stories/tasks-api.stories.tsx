import React, {useEffect, useState} from 'react'
import axios from "axios";

export default {
    title: 'API-tasks'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '3bb1f301-4343-478c-bd6d-e432168f19d7'
    }
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = "9c97cfb1-3739-4fc0-8e1f-9d36e76f7561"
    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.1//todo-lists/${"cc0b0a30-ba25-43a4-83c6-c4587f577f3a"}/tasks`, settings)
            .then((res) => {
                setState(res.data);
            })

    }, [])


    return <div> {JSON.stringify(state)}</div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>({name: 'Vlad'})
    useEffect(() => {
        axios.post(`https://social-network.samuraijs.com/api/1.1//todo-lists/${"cc0b0a30-ba25-43a4-83c6-c4587f577f3a"}/tasks`, {title: "Покурить"}, settings).then((res) => {
            setState(res.data);
        })


    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "cc0b0a30-ba25-43a4-83c6-c4587f577f3a";
        const taskId="624996c0-281c-44bf-8b21-9cf421559a3b"
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, settings).then((res) => {
            setState(res.data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "cc0b0a30-ba25-43a4-83c6-c4587f577f3a";
        const taskId="ae8180d3-4657-4a44-9159-de8cea73ccc9"
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}}`, {title: 'Мне изменили название'}, settings)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

