import React, {ChangeEvent} from 'react';
import {TaskType} from "../TodoList/TodoList";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


type TaskPropsType = TaskType & {
    id: string
    title: string
    removeTask: (todoListID: string, id: string) => void
    changeStatus: (todoListID: string, taskID: string, isDone: boolean) => void
    todoListID: string
    updateTitleTask: (taskID: string, title: string) => void
}


const Task = (props: TaskPropsType) => {
    const inputChangeStatus = (event: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.todoListID, props.id, event.currentTarget.checked)
    }
    const updateTitleToDolist = (title: string) => {
        props.updateTitleTask(props.id, title)
    }
    const removeTask = () => {
        props.removeTask(props.todoListID, props.id)
    }
    return (
        <div className='task'>
            <li>
                <label className="checkbox-other">
                    <div className='labelcontainer'>
                        {/*<input className='checkbox'*/}
                        {/*       onChange={inputChangeStatus}*/}
                        {/*       type="checkbox"*/}
                        {/*       checked={props.isDone}/>*/}
                        <Checkbox onChange={inputChangeStatus} checked={props.isDone}/>
                        <EditableSpan oldTitle={props.title} callback={updateTitleToDolist}/>

                        {/*/!*<div className='button_deleted'>*!/*/}
                        {/*<ButtonMy name={'x'}*/}
                        {/*          callback={removeTask}*/}
                        {/*          classname={''}/>*/}
                        <IconButton onClick={removeTask} size={"small"}>
                            <Delete/>
                        </IconButton>

                    </div>
                </label>
                {/*<input*/}
                {/*    className='checkbox'*/}
                {/*    onChange={inputChangeStatus}*/}
                {/*    type="checkbox"*/}
                {/*    checked={props.isDone}/>*/}
                {/*<span className={props.isDone ? "is-done" : ''}>{props.title}</span>*/}
                {/*<Button name={'x'}*/}
                {/*        callback={() => props.removeTask(props.id)}*/}
                {/*        classname={''}/>*/}

            </li>
        </div>
    );
};

export default Task;