import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { pokemonDataType, PokemonDataContext as DataContext } from './store'
import Filter from './filter'
import './globalStyle.scss'
import style from './mainStyle.module.scss'

function Main() {
    const [pokemonData, setPokemonData] = useState<pokemonDataType[]>([])
    const [filter, setFilter] = useState('')
    const nextURL = useRef('')

    async function addData() {
        const URL = nextURL.current || 'https://pokeapi.co/api/v2/pokemon?limit=50'

        const rawPokemonLists = await fetch(URL)
        const pokemonLists = await rawPokemonLists.json()

        nextURL.current = pokemonLists.next

        const promises: Array<Promise<void>> = []
        const tempPokemonData: pokemonDataType[] = []

        async function getAPokemonFullInfo(thisPokemon: any, i: number) {
            const thisPokemonName = thisPokemon.name

            const rawThisPokemonData = await fetch(thisPokemon.url)
            const thisPokemonData = await rawThisPokemonData.json()

            const thisPokemonAbility = thisPokemonData.abilities[0].ability.name

            const rawThisAbilityInfo = await fetch(thisPokemonData.abilities[0].ability.url)
            const thisAbilityInfo = await rawThisAbilityInfo.json()

            const thisPokemonShortEffect = thisAbilityInfo.effect_entries.find(
                (entry: any) => entry.language.name == 'en'
            )?.short_effect

            const thisPokemonFlavorTextEntries = thisAbilityInfo.flavor_text_entries.find(
                (entry: any) => entry.language.name == 'en'
            )?.flavor_text

            tempPokemonData[i] = {
                name: thisPokemonName,
                ability: thisPokemonAbility,
                short_effect: thisPokemonShortEffect,
                flavor_text_entries: thisPokemonFlavorTextEntries,
            }
        }

        pokemonLists.results.forEach((thisPokemon: any, i: number) => {
            promises[i] = getAPokemonFullInfo(thisPokemon, i)
        })

        for (const promise of promises) {
            await promise
        }

        setPokemonData(prev => prev.concat(...tempPokemonData))
    }

    useEffect(() => {
        addData()
    }, [])

    return (
        <>
            <p className={style.title}>Find Pokémon!</p>
            <DataContext.Provider value={{ pokemonData, setPokemonData, nextURL, addData, filter, setFilter }}>
                <Filter />
            </DataContext.Provider>
        </>
    )
}

const rootElement = document.createElement('div')
const root = createRoot(rootElement)
root.render(<Main />)

document.body.appendChild(rootElement)
