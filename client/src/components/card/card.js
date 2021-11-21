import React from 'react'
import { Link } from 'react-router-dom'

const Card = (props) => {
    return (
        <Link to={`/details/${props.name}`}>
            <div>
                <div>
                    <img src={props.img} alt={props.name} />
                </div>
                <div>
                    <div>
                        NOMBRE: {props.name.toUpperCase()}
                    </div>
                    <div>TIPO:{
                        props.types.map((e,i)=>{
                            return <p key={i}> {e}</p>
                        })
                    }
                    </div>
                    
                </div>
            </div>
        </Link>
    )
}

export default Card

