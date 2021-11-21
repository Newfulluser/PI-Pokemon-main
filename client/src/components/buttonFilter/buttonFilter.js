import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { dispatcher, filter, order, sorting } from '../../actions/actions'


const ButtonFilter = () => {
    const types = useSelector(store=>store.types)
    const dispatch = useDispatch()
    const [state, setstate] = useState("")
    const [button, setButton] = useState(true)

    function handleOnClick() {
        dispatch(filter(state))
        dispatch(dispatcher(""))
    }

    function handleOnChange(e) {
        setstate(e.target.value)
    }

    function sortingMethod (e) {
        dispatch(sorting(e.target.value))
    }

    function direction () {
        setButton(!button)
        dispatch(order(button))
    }

    return (
        <div>            
            <select onChange={handleOnChange}>
                <option>Types</option>
                <option>All</option>
                {types.map((e,i)=> <option key={i}>{e.nombre}</option>)}
            </select>
            <button onClick={handleOnClick}>
                Buscar Tipo
            </button>

            <select onChange={sortingMethod}>
                <option>Default</option>
                <option>Alfabético</option>
                <option>Fuerza</option>
                
            </select>
            <button onClick={direction}>
                {button?"Ascendente":"Descendente"}
            </button>

        </div>
    )
}

export default ButtonFilter
