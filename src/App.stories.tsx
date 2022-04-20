import React from 'react'
import AppWithRedux from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "./stories/decorators/ReduxStoreProviderDecorator";
import {Meta} from "@storybook/react";

export default {
    title: 'App component',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator],
} as Meta

export const AppBaseExample = () => {
    return <AppWithRedux/>
}