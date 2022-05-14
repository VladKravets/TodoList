import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Provider} from "react-redux";
import {store} from "./state/store";
import AppWithRedux from "./AppWithRedux";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>
);





