import axios, {AxiosResponse} from "axios";
import {ResponseType} from "./todolists-api";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '3bb1f301-4343-478c-bd6d-e432168f19d7'
    }
})

export type MeResponseType = {
        id: number,
        email: string,
        login: string
}
export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean
    captcha?: string
}
export const authAPI = {
    login(data: LoginParamsType) {
     return   instance.post<LoginParamsType, AxiosResponse<ResponseType<{ userId?: number }>>>('auth/login', data)

    },
    me() {
        return  instance.get<ResponseType<MeResponseType>>('auth/me')
    },
    logout(){
        return instance.delete<ResponseType>('auth/login')
    }
}
