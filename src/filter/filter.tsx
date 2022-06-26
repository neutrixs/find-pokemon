import React from 'react'
import style from './filterStyle.module.scss'

export default function Filter() {
    return (
        <div className={style.inputHolder}>
            <input className={style.input} placeholder="Filter pokémon by its name" />
        </div>
    )
}
