import React from 'react'
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";


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
            task={{id: '1', isDone: true, title: 'HTML'}}
            todolistId={'todolistId1'}
        />
        <Task
            changeTaskStatus={callbackChangeStatus}
            changeTaskTitle={callbackChangeTaskTitle}
            removeTask={callbackRemoveTask}
            task={{id: '2', isDone: false, title: 'GraphQL'}}
            todolistId={'todolistId2'}
        />
    </>
}