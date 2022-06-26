import React, { useContext, useRef } from 'react'
import { PokemonDataContext } from '../store'
import style from './filterStyle.module.scss'

export default function Filter() {
    const { setFilter } = useContext(PokemonDataContext)
    const inputElement = useRef<HTMLInputElement>(null)
    const setFilterTimeout = useRef<NodeJS.Timeout>(setTimeout(() => {}))

    function onChange() {
        clearTimeout(setFilterTimeout.current)
        setFilterTimeout.current = setTimeout(() => {
            setFilter(inputElement.current?.value || '')
        }, 200)
    }

    return (
        <div className={style.inputHolder}>
            <input className={style.input} placeholder="Filter pokémon by its name" onChange={onChange} ref={inputElement} />
        </div>
    )
}
