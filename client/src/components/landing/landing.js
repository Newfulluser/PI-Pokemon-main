import React from 'react'
import { Link } from 'react-router-dom'
import css from './landing.module.css'

const Landing = () => {
    return (
        <div className={css.landing}>
           <Link to="/home">Henry Pokemon</Link>
        </div>
    )
}

export default Landing
