import React from 'react'
import {action} from "@storybook/addon-actions";
import {AddItemForm} from "../Input/AddItemForm";


export default {
    title: 'Item component',
    component: AddItemForm,
}

const callback = action('Click')

export const AddItemFormExample = () => {
return <AddItemForm addItem={callback}/>
}