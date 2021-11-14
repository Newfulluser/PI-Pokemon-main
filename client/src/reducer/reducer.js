import { INPUT_HOME_NAME, SHOW_POKEMON } from "../constantes/constantes";

const initialState = {
    pokeHome: " ",
    pokemon: {}   
}

export function reducer (stateStore=initialState, action) {
    switch (action.type) {
        case INPUT_HOME_NAME: 
            return {...stateStore, pokeHome: action.payload};
        
        case SHOW_POKEMON:
            return {...stateStore, pokemon: action.payload}
            
    
        default:
            return stateStore;
        
    }
}