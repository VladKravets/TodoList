import React, {ChangeEvent, KeyboardEvent} from 'react';

type InputPropsType = {
    className: string
    title: string
    setTitle: (title: string) => void
    setError: (error: string) => void
    onClickAddTask: () => void
}


export const Input = (props: InputPropsType) => {

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value)
        props.setError('')
    }
    const onKeyPressTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.onClickAddTask()
        }
    }

    return (
        <input className={props.className}
               value={props.title}
               onChange={onChangeInputHandler}
               onKeyPress={onKeyPressTitle}/>
    );
};

