import { INPUT_HOME_NAME, SHOW_POKEMON } from "../constantes/constantes";
import axios from 'axios'

export function homeName (payload) {
    return {
        type: INPUT_HOME_NAME,
        payload: payload
    }
}

export function getPokes (name) {
    return function (dispatch) {
        axios(`http://localhost:3001/pokemons?name=${name}`)
        .then(data=>data.data)
        .then(data=>dispatch(dispatcher(data)))
    }
}

export function dispatcher (payload) {
    return {
        type: SHOW_POKEMON,
        payload: payload
    }
}