import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'

// You can learn about the difference by reading this guide on minimizing bundle size.
// https://mui.com/guides/minimizing-bundle-size/
// import { AppBar, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from "../components/SnackBar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {LinearProgress} from "@mui/material";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/TodolistsList/Login/Login";
import {Error404} from "../components/error/Error404";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(initializeAppTC())
    }, []);

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {status === `loading` && <LinearProgress color={'secondary'}/>}
            <Container fixed>
                <Routes>
                    <Route path={'login'} element={<Login/>}/>
                    <Route path={'/'} element={<TodolistsList/>}/>
                    <Route path={'404'} element={<Error404/>}/>
                    <Route path={'*'} element={<Navigate to={'404'}/>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App
