import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistsAPI} from "../API/API";

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
    const [todolistId, setTodolistId] = useState<string>('')


    const getTasks = () => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }

    return <div> {JSON.stringify(state)}

        <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
            setTodolistId((e.currentTarget.value))
        }}/>
        <button onClick={getTasks}>get Tasks</button>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "cc0b0a30-ba25-43a4-83c6-c4587f577f3a";
        const taskId = "624996c0-281c-44bf-8b21-9cf421559a3b"
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, settings).then((res) => {
            setState(res.data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [taskDescription, setTaskDescription] = useState<string>('')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')

    const updateTask = () => {
        todolistsAPI.updateTask(todolistId, taskId, {
            deadline: '',
            description: taskDescription,
            priority: priority,
            startDate: '',
            status: status,
            title: taskTitle
        })
            .then((res) => {
                setState(res.data)
            })

    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId((e.currentTarget.value))
            }}/>
            <input placeholder={'taskId'} value={taskId} onChange={(e) => {
                setTaskId((e.currentTarget.value))
            }}/>
            <input placeholder={'Task Title'} value={taskTitle} onChange={(e) => {
                setTaskTitle(e.currentTarget.value)
            }}/>
            <input placeholder={'Description'} value={taskDescription} onChange={(e) => {
                setTaskDescription(e.currentTarget.value)
            }}/>
            <input placeholder={'status'} value={status} onChange={(e) => {
                setStatus(+e.currentTarget.value)
            }}/>
            <input placeholder={'priority'} value={priority} onChange={(e) => {
                setPriority(+e.currentTarget.value)
            }}/>

            <button onClick={updateTask}>Update Task</button>
        </div>
    </div>
}
export const СreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const createTask = () => {
        todolistsAPI.createTask(todolistId, taskTitle)
            .then(res => {
                setState(res.data)
            })
    }


    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId((e.currentTarget.value))
            }}/>
            <input placeholder={'Task Title'} value={taskTitle} onChange={(e) => {
                setTaskTitle(e.currentTarget.value)
            }}/>
            <button onClick={createTask}>Create Task</button>
        </div>
    </div>
}

