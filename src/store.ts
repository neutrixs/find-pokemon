import { createContext, Dispatch, SetStateAction } from 'react'

interface pokemonDataType {
    name: string
    ability: string
    short_effect: string
}

const pokemonData: pokemonDataType[] = []
const setPokemonData: Dispatch<SetStateAction<pokemonDataType[]>> = () => {}

const nextURL = ''
const setNextURL: Dispatch<SetStateAction<string>> = () => {}

export const PokemonDataContext = createContext({
    pokemonData,
    setPokemonData,
    nextURL,
    setNextURL,
})
