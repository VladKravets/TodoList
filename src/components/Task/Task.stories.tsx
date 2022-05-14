import React from 'react'
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TasksPriorities, TaskStatuses} from "../../API/API";


export default {
    title: 'Task component',
    component: Task,
}

const callbackChangeStatus = action('Status is changed')
const callbackChangeTaskTitle = action('Title for task changed')
const callbackRemoveTask = action('Task removed')
const callback = action('Click')

export const AddItemFormExample = () => {
    return <>
        <Task
            changeTaskStatus={callbackChangeStatus}
            changeTaskTitle={callbackChangeTaskTitle}
            removeTask={callbackRemoveTask}
            task={{
                id: '1', status: TaskStatuses.Completed, title: 'HTML',
                todoListId: "todolistId1", startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TasksPriorities.Low, description: ''
            }}
            todolistId={'todolistId1'}
        />
        <Task
            changeTaskStatus={callbackChangeStatus}
            changeTaskTitle={callbackChangeTaskTitle}
            removeTask={callbackRemoveTask}
            task={{
                id: '2', status: TaskStatuses.New, title: 'GraphQL', todoListId: "todolistId2", startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TasksPriorities.Low, description: ''
            }}
            todolistId={'todolistId2'}
        />
    </>
}