import React from 'react';
import ToDoListHeader from "../TodoListHeader/ToDoListHeader";
import TaskList from "../TaskList/TaskList";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import {FilterValuesType} from "../../App";
import ControlButtons from "../ControlButtons/ControlButtons";
import {ButtonMy} from "../Button/ButtonMy";
import {Delete} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";

type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListID: string, id: string) => void
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    addTask: (todoListID: string, title: string) => void
    changeStatus: (todoListID: string, taskID: string, isDone: boolean) => void
    filter: FilterValuesType
    removeToDoList: (todoListID: string) => void
    updateTitleTask: (todolistID: string, taskID: string, title: string) => void
    updateToDoList: (todolistID: string, title: string) => void
}


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {
    const addTask = (title: string) => {
        props.addTask(props.todoListID, title)
    }
    const updateTitleTask = (taskID: string, title: string) => {
        props.updateTitleTask(props.todoListID, taskID, title)
    }
    const updateToDoList = (title: string) => {
        props.updateToDoList(props.todoListID, title)
    }

    const removeToDoList = () => {
        props.removeToDoList(props.todoListID)
    }
    return (
        <div className='container'>
            <div className='header_div'>
                <div className='button_deleted_toDolist'>
                    <IconButton onClick={removeToDoList} size={"small"}>
                        <Delete/>
                    </IconButton>
                    {/*<ButtonMy*/}
                    {/*    name={'x'}*/}
                    {/*    callback={() => props.removeToDoList(props.todoListID)}*/}
                    {/*    classname={'removeToDoList'}/>*/}
                </div>
                <ToDoListHeader
                    title={props.title}
                    updateToDoList={updateToDoList}/>
            </div>
            <div className='add_task'>
                <AddTaskForm
                    callback={addTask}/>
            </div>
            <div className='main'>
                <TaskList
                    tasks={props.tasks}
                    removeTask={props.removeTask}
                    changeStatus={props.changeStatus}
                    filter={props.filter}
                    todoListID={props.todoListID}
                    updateTitleTask={updateTitleTask}/>
            </div>
            <div>
                <ControlButtons
                    changeFilter={props.changeFilter}
                    filter={props.filter}
                    todoListID={props.todoListID}/>
            </div>
        </div>
    )
        ;
};

export default TodoList;