import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist/Todolist';
import AddItemForm from "./components/Item/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTDTitleAC,
    changeTodolistFilterAC,
    removeTodolistAC,
} from "./store/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "./store/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
function App() {
    // BLL:
    const tasks = useSelector<AppStoreType, TasksStateType>(state => state.tasks)
    const todolists = useSelector<AppStoreType, Array<TodolistType>>(state => state.todolists)
    const dispatch = useDispatch()


    const removeTask =useCallback((id: string, todolistId: string)=> {
        dispatch(removeTaskAC(id, todolistId))
    },[dispatch])

    const addTask=useCallback((title: string, todolistId: string)=> {
        dispatch(addTaskAC(title, todolistId))
    },[dispatch])

    const changeStatus=useCallback((id: string, isDone: boolean, todolistId: string)=> {
        dispatch(changeTaskStatusAC(id, isDone, todolistId))
    },[dispatch])


    const changeFilter=useCallback((value: FilterValuesType, todolistId: string)=> {
        dispatch(changeTodolistFilterAC(value, todolistId))
    },[dispatch])

    const removeTodolist=useCallback((id: string)=> {
        dispatch(removeTodolistAC(id))
    },[dispatch])

    const addNewTodolist=useCallback((newTodolistTitle: string)=> {
        dispatch(addTodolistAC(newTodolistTitle))
    },[dispatch])

    const changeTaskTitle=useCallback((id: string, title: string, todolistId: string)=> {
        dispatch(changeTaskTitleAC(id, title, todolistId))
    },[dispatch])

    const changeTodolistTitle=useCallback((title: string, todolistId: string)=> {
        dispatch(changeTDTitleAC(title, todolistId))
    },[dispatch])

    // UI:
    const todolistsComponents = todolists.map(tl => {
        const allTodolistTasks = tasks[tl.id];
        let tasksForTodolist = allTodolistTasks;



        return (
            <Grid item key={tl.id}>
                <Paper style={{padding: '10px'}} elevation={10} key={tl.id}>
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
        )
    })


    return (
        <div className="App">
            <AppBar position="static">

                <Toolbar>
                    <IconButton>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>

            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '30px'}}>
                    <AddItemForm addItem={addNewTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todolistsComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
