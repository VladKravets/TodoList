import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from '../../App';
import AddItemForm from "../Item/AddItemForm";
import EditableSpan from "../Span/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    changeTaskTitle: (id: string, title: string, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}

export const Todolist = React.memo((props: PropsType) => {

    const removeTodolist = () => props.removeTodolist(props.id);
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const addTaskToTodolist = (newTitle: string) => props.addTask(newTitle, props.id);
    const changeTodolistTitle = (title: string) => props.changeTodolistTitle(title, props.id);
    let tasksForTodolist = props.tasks
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(tl => !tl.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(tl => tl.isDone);
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTaskToTodolist}/>
        <div>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.id)
                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                        {/*<span>{t.title}</span>*/}
                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button variant={props.filter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button color={'primary'} variant={props.filter === 'active' ? "contained" : "text"}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button color={'secondary'} variant={props.filter === 'completed' ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
})


