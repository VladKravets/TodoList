import React from 'react'
import {action} from "@storybook/addon-actions";
import {AddItemForm} from "./AddItemForm";


export default {
    title: 'Item component',
    component: AddItemForm,
}

const callback = action('New Title is')

export const AddItemFormExample = () => {
return <AddItemForm addItem={callback}/>
}