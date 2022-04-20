import React from 'react'
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";

export default {
    title: 'App component',
    component: AppWithRedux,
}

export const AppBaseExample = () => {
    return <Provider store={store}>
        <AppWithRedux/>
    </Provider>
}