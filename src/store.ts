import { createContext, Dispatch, SetStateAction, MutableRefObject } from 'react'

interface pokemonDataType {
    name: string
    flavor_text_entries: string
    short_effect: string
}

const pokemonData: pokemonDataType[] = []
const setPokemonData: Dispatch<SetStateAction<pokemonDataType[]>> = () => {}

const filter = ''
const setFilter: Dispatch<SetStateAction<string>> = () => {}

const nextURL: MutableRefObject<string> = { current: '' }

const addData: () => Promise<void> = async () => {}

const PokemonDataContext = createContext({
    pokemonData,
    setPokemonData,
    filter,
    setFilter,
    nextURL,
    addData,
})

export { pokemonDataType, PokemonDataContext }
