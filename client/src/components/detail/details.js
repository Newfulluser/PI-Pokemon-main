import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { dispatcher, getPokes } from '../../actions/actions'
import logo from './Yg6z.gif'


const Details = (props) => {
   
    
    const dispatch= useDispatch()
    const loading = useSelector(store=>store.loading)
    const pokemon = useSelector(store=>store.pokemon)
    useEffect(() => {
      dispatch(getPokes(props.match.params.name))      
    },[dispatch,props.match.params.name])
    
    

    function handleClick() {
        dispatch(dispatcher(""))
    }


    return (
        
        <div>
            <Link to="/home">
                <button onClick={handleClick}>Home</button>
            </Link>
            { 
               loading?
               <img src={logo} alt="LOADING..." />
               :
               pokemon.nombre?
                <div>
                    <div>
                        {pokemon.nombre.toUpperCase()}
                    </div>
                    <div>
                        <img src={pokemon.img} alt={pokemon.nombre} />
                    </div>
                    <div>          
                        <div>
                             ID: {pokemon.id_pokemon}
                       
                        </div>           
                        <div>
                            TIPO/s:{
                                pokemon.tipos.map((e,i)=>{
                                return <p key={i}> {e}</p> 
                                })
                            }
                        </div>
                        <div>
                            ESTADÍSTICAS:
                        </div>
                        <div>
                            <p>
                            vida: {pokemon.habilidades.vida}
                            </p>
                            <p>
                            fuerza: {pokemon.habilidades.fuerza}
                            </p>
                            <p>
                            defensa: {pokemon.habilidades.defensa}                                
                            </p>
                            <p>
                            velocidad: {pokemon.habilidades.velocidad}
                            </p>
                        </div>
                        <div>
                            <p>altura: {pokemon.altura}</p>
                            <p> peso: {pokemon.peso}</p>
                           
                        </div>                    
                    </div>
                </div>
                :
                <p>ERROR: {pokemon}</p>        
            }
        </div>
    )
}

export default Details
