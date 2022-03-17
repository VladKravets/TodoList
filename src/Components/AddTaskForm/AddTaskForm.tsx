import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddTaskFormPropsType = {
    callback: (title: string) => void
}

const AddTaskForm = (props: AddTaskFormPropsType) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | ''>('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError('')
    }
    const onClickAddTask = () => {
        if (title.trim()) {
            props.callback(title.trim())
            setTitle('')
            setError('')
        } else {
            setError('Title is required')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            onClickAddTask()
        }
    }


    let classError = (error ? 'input-add error' : 'input-add')
    return (
        <div>
            <TextField value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       id="standard-basic"
                       label="Type value"
                       variant="standard"
                       error={!!error}
                       helperText={error}
                // autoComplete='off'
                     />
            {/*<input*/}
            {/*    value={title}*/}
            {/*    onChange={onChangeHandler}*/}
            {/*    onKeyPress={onKeyPressHandler}*/}
            {/*    className={classError}*/}
            {/*/>*/}
            <IconButton onClick={onClickAddTask} size={"small"}>
               <AddBox/>
            </IconButton>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    );
};

export default AddTaskForm;