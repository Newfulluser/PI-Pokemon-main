import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getPokes, homeName } from '../../actions/actions'

const Form = () => {
    const dispatch = useDispatch()
    const pokeHome = useSelector(store=>store.pokeHome)
    
    
    function handleOnChange (e) {
        dispatch(homeName(e.target.value))
    }

    function handleOnClick(e) {
        e.preventDefault()
        dispatch(getPokes(pokeHome))
    }
    
    return (
        <div>
            <form>
                <button onClick={handleOnClick}>
                    Buscar
                </button>
                <input onChange={handleOnChange} name="input" type="text" />
            </form>
        </div>
    )
}



export default Form
