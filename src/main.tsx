import React from 'react'
import { createRoot } from 'react-dom/client'
import './globalStyle.scss'
import style from './mainStyle.module.scss'

function Main() {
    return (
        <>
            <p className={style.title}>Find Pokémon from its ability!</p>
        </>
    )
}

const rootElement = document.createElement('div')
const root = createRoot(rootElement)
root.render(<Main />)

document.body.appendChild(rootElement)
