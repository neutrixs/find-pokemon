import { createContext, Dispatch, SetStateAction, MutableRefObject } from 'react'

interface pokemonDataType {
    name: string
    ability: string
    short_effect: string
}

const pokemonData: pokemonDataType[] = []
const setPokemonData: Dispatch<SetStateAction<pokemonDataType[]>> = () => {}

const nextURL: MutableRefObject<string> = { current: '' }

const PokemonDataContext = createContext({
    pokemonData,
    setPokemonData,
    nextURL,
})

export { pokemonDataType, PokemonDataContext }
