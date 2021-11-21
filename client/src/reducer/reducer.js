import { ALL_POKEMON, DB_TYPES, FILTER, INPUT_HOME_NAME, LOADING, ORDER, SHOW_POKEMON, SORTING } from "../constantes/constantes";

const initialState = {
    pokeHome: "",
    pokemon: "",
    pokemones: [],
    types: [],
    filterPokes:[],
    loading: false,
    sorting: "Default",
    order: false

}

export function reducer (stateStore=initialState, action) {
    switch (action.type) {
        case INPUT_HOME_NAME: 
            return {...stateStore, pokeHome: action.payload};
        
        case SHOW_POKEMON:
            return {...stateStore, loading: false, pokemon: action.payload}
        
        case ALL_POKEMON:
            return {...stateStore, pokemones: action.payload}

        case DB_TYPES:
            return {...stateStore, types: action.payload}

        case FILTER:
            if(action.payload === "Types" || action.payload === "All" || action.payload === "") return {...stateStore, filterPokes: [] }
            var result = stateStore.pokemones.filter(e=>e.types.includes(action.payload))
            if(result.length>0) return {...stateStore, filterPokes: result }
            return {...stateStore, filterPokes: 0 }

        case LOADING:
            return {...stateStore, loading: action.payload }

        case SORTING:
            return {...stateStore, sorting: action.payload }
            
        case ORDER:
            return {...stateStore, order: action.payload }
    
        default:
            return stateStore;
        
    }
}