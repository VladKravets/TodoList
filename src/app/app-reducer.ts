import {Dispatch} from "redux";
import {authAPI} from "../api/auth-api";
import {setIsLoggedInAC} from "../features/TodolistsList/Login/login-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/utils";
import {Simulate} from "react-dom/test-utils";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

//actions
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}


//thunk
export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me()
        .then(res => {
            debugger
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


//types
export type setAppStatusType = ReturnType<typeof setAppStatusAC>
export type setAppErrorType = ReturnType<typeof setAppErrorAC>
export type ActionsType = setAppStatusType | setAppErrorType