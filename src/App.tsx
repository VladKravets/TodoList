import React, {useCallback, useEffect} from 'react'
import './App.css';
import {Todolist} from './components/Todolist/Todolist';
import {AddItemForm} from './components/Input/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC, addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, fetchTodolistsTC, FilterValuesType,
    removeTodolistAC, TodolistDomainType,
} from './state/todolists-reducer';
import {
    addTaskTC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    deleteTaskTC, updateTaskStatusTC,
} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TaskStatuses, TaskType} from "./API/API";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

/*
const Fake = React.memo(function() {
    console.log("FAKE")
    const arr = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks.count)
    return <h1>{arr.length}</h1>
})
*/

function App() {

    useEffect(() => {
        //@ts-ignore
        dispatch(fetchTodolistsTC())
    }, []);

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();


    const removeTask = useCallback(function (tasksId: string, todolistId: string) {
        //@ts-ignore
        dispatch(deleteTaskTC(todolistId, tasksId));
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string,) {
        const thunk = (addTaskTC(title, todolistId));
        //@ts-ignore
        dispatch(thunk)
    }, []);

    const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
        //@ts-ignore
        dispatch(updateTaskStatusTC(taskId, todolistId, status));
    }, []);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(id, newTitle, todolistId);
        dispatch(action);
    }, [dispatch]);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, [dispatch]);

    const addTodolist = useCallback((title: string) => {
        //@ts-ignore
        dispatch(addTodolistTC(title));
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        const action = removeTodolistAC(id);
        dispatch(action);
    }, [dispatch]);

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        const action = changeTodolistTitleAC(id, title);
        dispatch(action);
    }, [dispatch])


    return (
        <div className="App">
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
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
