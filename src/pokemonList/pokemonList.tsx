import React, { useContext, useEffect, useState } from 'react'
import { PokemonDataContext, pokemonDataType } from '../store'
import Loading from '../loading'
import style from './pokemonListStyle.module.scss'

export default function PokemonList() {
    const { filter, pokemonData, addData } = useContext(PokemonDataContext)
    const [filteredData, setFilteredData] = useState<pokemonDataType[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const filtered = pokemonData.filter(pokemon => pokemon.name.includes(filter) || pokemon.ability.includes(filter))

        setFilteredData(filtered)
    }, [pokemonData, filter])

    function getFilteredAmount(): React.ReactNode {
        if (!filter) return null

        if (filteredData.length == 0) {
            return <p>No items matched filter</p>
        }

        return <p>Showing {filteredData.length} items that matched filter</p>
    }

    function renderData(): React.ReactNode {
        return filteredData.map(pokemon => (
            <div className={style.eachPokemon}>
                <p className={style.name}>{pokemon.name}</p>
                <p>
                    <span>Ability:</span> {pokemon.ability}
                </p>
                <p>
                    <span>Short Effect:</span> {pokemon.short_effect}
                </p>
                <p>
                    <span>Flavor text entries:</span> {pokemon.flavor_text_entries}
                </p>
            </div>
        ))
    }

    function loading() {
        return pokemonData.length == 0 || isLoading ? <Loading /> : null
    }

    function loadMoreButton() {
        async function requestMore() {
            setIsLoading(true)
            await addData()
            setIsLoading(false)
        }

        if (filter) return null
        if (pokemonData.length == 0 || isLoading) return null

        return (
            <button className={style.button} onClick={requestMore}>
                Load more
            </button>
        )
    }

    return (
        <div className={style.holder}>
            {getFilteredAmount()}
            <div className={style.listHolder}>{renderData()}</div>
            {loading()}
            {loadMoreButton()}
        </div>
    )
}
