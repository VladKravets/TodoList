import React from 'react';
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


    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(id, isDone, todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch(changeTodolistFilterAC(value, todolistId))
    }

    function removeTodolist(id: string) {
        dispatch(removeTodolistAC(id))
    }

    function addNewTodolist(newTodolistTitle: string) {
        dispatch(addTodolistAC(newTodolistTitle))
    }

    function changeTaskTitle(id: string, title: string, todolistId: string) {
        dispatch(changeTaskTitleAC(id, title, todolistId))
    }

    function changeTodolistTitle(title: string, todolistId: string) {
        dispatch(changeTDTitleAC(title, todolistId))
    }

    // UI:
    const todolistsComponents = todolists.map(tl => {
        const allTodolistTasks = tasks[tl.id];
        let tasksForTodolist = allTodolistTasks;

        if (tl.filter === "active") {
            tasksForTodolist = allTodolistTasks.filter(tl => !tl.isDone);
        }
        if (tl.filter === "completed") {
            tasksForTodolist = allTodolistTasks.filter(tl => tl.isDone);
        }

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
