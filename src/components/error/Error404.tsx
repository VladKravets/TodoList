import React from 'react'
import s from './Error.module.css'

export function Error404() {
    return (
        <div className={s.error}>
            <div className={s.errorNum}>404</div>
            <div className={s.errorText}>Page not found!</div>
            <div className={s.errorSmile}>¯\_(ツ)_/¯</div>
        </div>
    )
}


