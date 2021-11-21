import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { dispatcher, filter, getPokes, homeName } from '../../actions/actions'

const Form = () => {
    const dispatch = useDispatch()
    const pokeHome = useSelector(store=> store.pokeHome)
    const [pokemon, setpokemon] = useState("")
    
    
    function handleOnChange (e) {
       /*  if(!isNaN(Number(e.target.value))) {
            setpokemon("")
            return alert("no se pueden ingresar numeros")    
        } */
        setpokemon(e.target.value)
        dispatch(homeName(e.target.value.toLowerCase()))
    }

    function handleOnClick(e) {
        e.preventDefault()
        if(pokeHome!=="")dispatch(getPokes(pokeHome))
        else dispatch(dispatcher(""))
        dispatch(filter(""))
        dispatch(homeName(""))
        setpokemon("")
    }
    
    return (
        <div>
            <form>
                <button onClick={handleOnClick}>
                    Buscar
                </button>
                <input onChange={handleOnChange} name="input" type="text" value={pokemon} placeholder="Ingrese el nombre o ID"/>
            </form>
        </div>
    )
}



export default Form
