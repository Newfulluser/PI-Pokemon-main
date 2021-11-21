import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import logo from './Yg6z.gif'

import ButtonFilter from '../buttonFilter/buttonFilter'
import Card from '../card/card'
import Form from '../form/form'

const Home = () => {
    const loading = useSelector(store=>store.loading)   
    const pokemones = useSelector(store=>store.pokemones)
    const filterPokes = useSelector(store=>store.filterPokes)
    const pokemon = useSelector(store=>store.pokemon)
    const sorting = useSelector(store=>store.sorting)
    const order = useSelector(store=>store.order)
    
    const [all, setAll] = useState(pokemones)
    const [filter, setFilter] = useState(filterPokes)

    if (!order){
        if(sorting==="Alfabético") {pokemones.sort((a,b)=>{
            if(a.name<b.name) return -1
            if(b.name<a.name) return 1
            return 0
        })
        if (filterPokes)filterPokes.sort((a,b)=>{
            if(a.name<b.name) return -1
            if(b.name<a.name) return 1
            return 0
        })
    }
        
        if(sorting==="Default") {pokemones.sort((a,b)=>{
            if(a.id<b.id) return -1
            if(b.id<a.id) return 1
            return 0
        })
        if (filterPokes)filterPokes.sort((a,b)=>{
            if(a.id<b.id) return -1
            if(b.id<a.id) return 1
            return 0
        })
    }

        if(sorting==="Fuerza") {pokemones.sort((a,b)=>{
            if(a.attack<b.attack) return -1
            if(b.attack<a.attack) return 1
            return 0
        })
        if (filterPokes)filterPokes.sort((a,b)=>{
            if(a.attack<b.attack) return -1
            if(b.attack<a.attack) return 1
            return 0
            })    
        }
    } else {
        if(sorting==="Alfabético") {pokemones.sort((a,b)=>{
                if(a.name<b.name) return 1
                if(b.name<a.name) return -1
                return 0
            })
            if (filterPokes)filterPokes.sort((a,b)=>{
                if(a.name<b.name) return 1
                if(b.name<a.name) return -1
                return 0
            })
        }
        
        if(sorting==="Default") {pokemones.sort((a,b)=>{
                if(a.id<b.id) return 1
                if(b.id<a.id) return -1
                return 0
            })
            if (filterPokes)filterPokes.sort((a,b)=>{
                if(a.id<b.id) return 1
                if(b.id<a.id) return -1
                return 0
            })
        }

        if(sorting==="Fuerza") {pokemones.sort((a,b)=>{
                if(a.attack<b.attack) return 1
                if(b.attack<a.attack) return -1
                return 0
            })
            if (filterPokes)filterPokes.sort((a,b)=>{
                if(a.attack<b.attack) return 1
                if(b.attack<a.attack) return -1
                return 0
            })
        }
    }
    
    useEffect(()=>{
        setAll(pokemones)
        setFilter(filterPokes)
    },[pokemones,filterPokes])


 
         
    return (
        <div>
            <Form/>
            <ButtonFilter/>
           
            {   
                loading === true?  <img src={logo} alt="LOADING..." />
                :
                filter === 0? <span>Ese tipo no está en la lista</span>
                :
                filter.length >0? filter.map((e,i)=><Card key={i} img={e.img} types={e.types} name={e.name}/> )
                :
                pokemon === ""? all.map((e, i)=><Card key={i}img={e.img} types={e.types} name={e.name}/> )
                :
                pokemon.nombre? 
                <Card img={pokemon.img} types={pokemon.tipos} name={pokemon.nombre}/>
                :
                pokemon

            }

        </div>
    )
}

export default Home
