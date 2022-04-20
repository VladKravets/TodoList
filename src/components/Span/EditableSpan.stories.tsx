import React from 'react'
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";


export default {
    title: 'EditableSpan component',
    component: EditableSpan,
}

const callback = action('Start value changed on')

export const EditableSpanExample = () => {
    return <EditableSpan value={'start value'} onChange={callback}/>
}