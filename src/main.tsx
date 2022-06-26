import React, { useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { pokemonDataType, PokemonDataContext as DataContext } from './store'
import './globalStyle.scss'
import style from './mainStyle.module.scss'

function Main() {
    const [pokemonData, setPokemonData] = useState<pokemonDataType[]>([])
    const nextURL = useRef('')

    return (
        <>
            <p className={style.title}>Find Pokémon from its ability!</p>
            <DataContext.Provider value={{ pokemonData, setPokemonData, nextURL }}></DataContext.Provider>
        </>
    )
}

const rootElement = document.createElement('div')
const root = createRoot(rootElement)
root.render(<Main />)

document.body.appendChild(rootElement)
