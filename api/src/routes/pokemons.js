const { Router } = require('express');
const axios = require('axios')
const pokemons = Router();

const promesa= (param)=>{
    return axios({method:'GET',url: param}).then(data=>data.data).catch(err=>console.log(err))
}
  pokemons.get('/',async (req,res)=>{   
    try {
        const pokemones=[]
        const array= await axios({method:'GET',url: 'https://pokeapi.co/api/v2/pokemon'}).then(data=>data.data.results)
        const details= array.map(element=>promesa(element.url))
        Promise.all(details)
        .then(data=>{    
            data.map(element=>{
                let id_types=[] 
                element.types.map(e=>{
                //https://pokeapi.co/api/v2/type/12/
                let aux= e.type.url.split('/')
                id_types.push(aux[aux.length-2])
             }) 
            const infoPokemon= {
                nombre: element.name,
                types: id_types,
                img: element.sprites.other.home.front_default
            }
          pokemones.push(infoPokemon)
        })
        res.json(pokemones)
      })
      .catch(err=>res.json(err))
    } catch (error) {
      res.json(error)
    }
  })

/* pokemons.get("/", async(req,res)=>{
    const pokemons = await axios({method:"GET", url: "https://pokeapi.co/api/v2/pokemon"})
                    .then(data=>data.data.results)
    res.send(pokemons)    
}) */



module.exports = pokemons;