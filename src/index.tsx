import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createTheme, ThemeProvider} from "@material-ui/core/styles";
import {teal} from "@material-ui/core/colors";
import {CssBaseline} from "@material-ui/core";

const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main:teal[700],
        },
        secondary: {
            main: '#f44336',
        },
    },
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline>
            <App/>
        </CssBaseline>
    </ThemeProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
