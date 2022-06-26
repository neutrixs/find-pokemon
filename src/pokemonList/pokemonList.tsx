import React, { useContext, useEffect, useState } from 'react'
import { PokemonDataContext, pokemonDataType } from '../store'
import Loading from '../loading'
import style from './pokemonListStyle.module.scss'

export default function PokemonList() {
    const { filter, pokemonData } = useContext(PokemonDataContext)
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

    return (
        <div className={style.holder}>
            {getFilteredAmount()}

            {pokemonData.length == 0 || isLoading ? <Loading /> : null}
        </div>
    )
}
