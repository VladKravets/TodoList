import React from 'react';
import './ControlButtons.css'
import {FilterValuesType} from "../../App";
import {ButtonMy} from "../Button/ButtonMy";
import {Button} from "@material-ui/core";


type ControlButtonsType = {
    todoListID: string
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    filter: FilterValuesType
}

const ControlButtons = (props: ControlButtonsType) => {
        const onClickButtonChangeFilter = (filter: FilterValuesType) => {
            return () => props.changeFilter(props.todoListID, filter)
        }

        // const classButtonAll = (props.filter === "all" ? 'button active-filter' : 'button')
        // const classButtonCompleted = (props.filter === "completed" ? 'button active-filter' : 'button')
        // const classButtonActive = (props.filter === "active" ? 'button active-filter' : 'button')
        return (
            <div className={"button_filter"}>
                <Button variant={props.filter === "all" ? 'contained' : 'text'} size="small" onClick={onClickButtonChangeFilter('all')}>
                    All
                </Button>
                <Button variant={props.filter === "active" ? 'contained' : 'text'} size="small" onClick={onClickButtonChangeFilter('active')}>
                Active
                </Button>
                <Button variant={props.filter === "completed" ? 'contained' : 'text'} size="small" onClick={onClickButtonChangeFilter('completed')}>
                    Completed
                </Button>
                {/*<ButtonMy name={"All"}*/}
                {/*          callback={onClickButtonChangeFilter('all')}*/}
                {/*          classname={classButtonAll}/>*/}
                {/*<ButtonMy name={'Completed'}*/}
                {/*          callback={onClickButtonChangeFilter('completed')}*/}
                {/*          classname={classButtonCompleted}/>*/}
                {/*<ButtonMy name={'Active'}*/}
                {/*          callback={onClickButtonChangeFilter('active')}*/}
                {/*          classname={classButtonActive}/>*/}

            </div>
        );

    }
;
export default ControlButtons;