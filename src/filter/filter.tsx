import React, { useContext, useRef } from 'react'
import { PokemonDataContext } from '../store'
import style from './filterStyle.module.scss'

export default function Filter() {
    const { setFilter } = useContext(PokemonDataContext)
    const inputElement = useRef<HTMLInputElement>(null)

    function onChange() {
        setFilter(inputElement.current?.value || '')
    }

    return (
        <div className={style.inputHolder}>
            <input
                className={style.input}
                placeholder="Filter pokémon by its name or ability"
                onChange={onChange}
                ref={inputElement}
            />
        </div>
    )
}
