import { ALL_POKEMON, DB_TYPES, FILTER, INPUT_HOME_NAME, LOADING, ORDER, SHOW_POKEMON, SORTING } from "../constantes/constantes";
import axios from 'axios'

export function homeName (payload) {
    return {
        type: INPUT_HOME_NAME,
        payload: payload
    }
}

export function getPokes (name) {
    return function (dispatch) {
        dispatch(loading(true))
        axios(`http://localhost:3001/pokemons?name=${name}`)
        .then(data=>data.data)
        .then(data=>dispatch(dispatcher(data)))
        .catch(e=>console.log(e))
    }
}

export function dispatcher (payload) {
    return {
        type: SHOW_POKEMON,
        payload: payload
    }
}

export function homePokemons (payload) {
    return {
        type: ALL_POKEMON,
        payload: payload
    }
}

export function allPokemon () {
    return function (dispatch) {
        axios(`http://localhost:3001/pokemons`)
        .then(data=>data.data)
        .then(data=>dispatch(homePokemons(data)))
        .catch(e=>console.log(e))
    }
}

export function types (payload) {
    return {
        type: DB_TYPES,
        payload: payload
    }
}


export function db_types () {
    return function (dispatch) {
        axios(`http://localhost:3001/types`)
        .then(data=>data.data)
        .then(data=>dispatch(types(data)))
        .catch(e=>console.log(e))
    }
}

export function filter (payload) {
    return {
        type: FILTER,
        payload: payload
    }
}

export function loading (payload) {
    return {
        type: LOADING,
        payload: payload
    }
}

export function sorting (payload) {
    return {
        type: SORTING,
        payload: payload
    }
}
export function order (payload) {
    return {
        type: ORDER,
        payload: payload
    }
}