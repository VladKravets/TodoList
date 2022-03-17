import React from 'react';
import {EditableSpan} from "../EditableSpan/EditableSpan";

type ToDoListHeaderPropsType = {
    title: string
    updateToDoList:(title:string) => void
}

const ToDoListHeader = (props: ToDoListHeaderPropsType) => {
    const updateToDoList = (title:string) => {
        props.updateToDoList(title)
    }
    return (
            <h3 className='header'>
                <EditableSpan oldTitle={props.title} callback={updateToDoList}/>
            </h3>
    );
};

export default ToDoListHeader;