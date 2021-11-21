const { Router } = require('express');
const pokemons = Router();
const axios= require('axios')
const { Pokemon,PokemonTipo, Tipo } = require('../db');

const promesa= (param)=>{
  return axios({method:'GET',url: param}).then(data=>data.data).catch(err=>console.log(err))
}

pokemons.get('/',async (req,res)=>{ 
  const {name}= req.query
  if (name) {
    try {
      const PokemonDB= await Pokemon.findAll( // me trae un array con 1 solo objto
        {
          where: {
            name: name
          }
        }
      )
      if (PokemonDB.length>0) {
        const tuplas= await PokemonTipo.findAll( // me retorna un array de objts y cada objt es una tupla de mi model
          {
            attribute:['tipoIdTipo'],
            where: {
              pokemonIdPokemon: PokemonDB[0].id_pokemon
            }
          }
        )
        const nombresTipos= tuplas.map(async (element)=>{
          let aux= await Tipo.findByPk(element.tipoIdTipo)
          return aux.nombre
        })
        const objPokemonDB= {
          id_pokemon: PokemonDB[0].id_pokemon,
          nombre: PokemonDB[0].nombre,
          img: PokemonDB[0].img,
          tipos: nombresTipos,
          habilidades:{
            vida:PokemonDB[0].vida,
            fuerza:PokemonDB[0].fuerza,
            defensa:PokemonDB[0].defensa,
            velocidad:PokemonDB[0].velocidad
          },
          altura: PokemonDB[0].altura,
          peso: PokemonDB[0].peso
        }
        res.json(objPokemonDB)
      }
      else{
        try { 
          const requestQuery= await axios({method:'GET',url: `https://pokeapi.co/api/v2/pokemon/${name}`})
          const objPokemon= requestQuery.data
          let nombreT= objPokemon.types.map(element=>{
            //https://pokeapi.co/api/v2/type/12/
            return  element.type.name
          }) 
          let vida='no disponible'
          let fuerza='no disponible'
          let defensa='no disponible'
          let velocidad='no disponible'
      
          objPokemon.stats.map(element=>{
            if (element.stat.name==='hp') {
              vida= element.base_stat
            }
            else if(element.stat.name==='attack'){
              fuerza= element.base_stat
            }
            else if(element.stat.name==='defense'){
              defensa= element.base_stat
            }
            else if(element.stat.name==='speed'){
              velocidad= element.base_stat
            }
          })
          const infoPokemon={
            id_pokemon: objPokemon.id,
            nombre: objPokemon.name,
            img: objPokemon.sprites.other.home.front_default,
            tipos: nombreT,
            habilidades:{
              vida,
              fuerza,
              defensa,
              velocidad
            },
            altura: objPokemon.height,
            peso: objPokemon.weight
          }
          res.json(infoPokemon)
        } catch (error) {
          res.json('No existe ese pokemon')
        }
      }
    } catch (error) {
      res.json(error)
    }
  }
  else{
    try {
      const request40= await axios({method:'GET',url: 'https://pokeapi.co/api/v2/pokemon?limit=40'})
      let arrayObjetos= request40.data.results
      console.log(arrayObjetos.length)
      const arrayPromises= arrayObjetos.map(element=>promesa(element.url)) //creo un array de promises 
      const pokemones=[]
      Promise.all(arrayPromises)
      .then(data=>{     // data es un array con todas las promsesas resueltas ... [pokemon1,pokemon2,pokemon3]
        data.map(element=>{
          // nombre, tipo y foto
          let id_tipo= element.types.map(e=>{
            return  e.type.name
          })  
          const infoPokemon= {
            id: element.id,
            name: element.name,
            types: id_tipo,
            img: element.sprites.other.home.front_default,
            attack: element.stats[1].base_stat
          }
          pokemones.push(infoPokemon)
        })
        res.json(pokemones)
      })
      .catch(err=>res.json(err))
    } catch (error) {
      res.json(error)
    }
  }
})

pokemons.get('/:idPokemon',async(req,res)=>{
  const {idPokemon}= req.params
  try {
    if (idPokemon.length===36) {
      const PokemonDB= await Pokemon.findByPk(idPokemon)
      if (PokemonDB!==null) {
        const tuplas= await PokemonTipo.findAll( // me retorna un array de objts y cada objt es una tupla de mi model
          {
            attribute:['tipoIdTipo'],
            where: {
              pokemonIdPokemon: idPokemon
            }
          }
        )
        const id_type= tuplas.map(element=>element.tipoIdTipo) 
        const objPokemonDB= {
          id_pokemon: PokemonDB.id_pokemon,
          nombre: PokemonDB.nombre,
          img: PokemonDB.img,
          tipos: id_type,
          habilidades:{
            vida:PokemonDB.vida,
            fuerza:PokemonDB.fuerza,
            defensa:PokemonDB.defensa,
            velocidad:PokemonDB.velocidad
          },
          altura: PokemonDB.altura,
          peso: PokemonDB.peso
        }
        return res.json(objPokemonDB)
      }
      else{
        console.log('No está en la DB')
      }
    }
  } catch (error) {
    res.json(error)
  }
  try { 
    const requestPokemon= await axios({method:'GET',url: `https://pokeapi.co/api/v2/pokemon/${idPokemon}`})
    const objPokemon= requestPokemon.data
    let nombreT= objPokemon.types.map(element=>{
      return  element.type.name
    }) 
    let vida='no disponible'
    let fuerza='no disponible'
    let defensa='no disponible'
    let velocidad='no disponible'

    objPokemon.stats.map(element=>{
      if (element.stat.name==='hp') {
        vida= element.base_stat
      }
      else if(element.stat.name==='attack'){
        fuerza= element.base_stat
      }
      else if(element.stat.name==='defense'){
        defensa= element.base_stat
      }
      else if(element.stat.name==='speed'){
        velocidad= element.base_stat
      }
    })
    const infoPokemon={
      id_pokemon: objPokemon.id,
      nombre: objPokemon.name,
      img: objPokemon.sprites.other.home.front_default,
      tipos: nombreT,
      habilidades:{
        vida,
        fuerza,
        defensa,
        velocidad
      },
      altura: objPokemon.height,
      peso: objPokemon.weight
    }
    res.json(infoPokemon)
  } catch (error) {
    res.json(error)
  }
})

pokemons.post('/', async(req,res)=>{
  const {nombre, vida, fuerza, defensa, velocidad, altura, peso, img, tipos}= req.body //tipos debe ser un array, el id_pokemon se autocrea
  try {
    const request40= await axios({method:'GET',url: `https://pokeapi.co/api/v2/pokemon/${nombre}`})
    const respuesta= request40.data  // cae un array de objts
    //const result= respuesta.find(element=>element.name===nombre)
    if (respuesta.name) {
      return res.json('Este pokemon ya existe')
    }   
  } catch (error) {
    console.log('el servidor no encontró ese pokemon en pokeapi')
  }
  try {
    const tupla = await Pokemon.create({
      nombre,
      vida,
      fuerza,
      defensa,
      velocidad,
      altura, 
      peso,
      img
    })
    await tupla.setTipos(tipos) // el metodo setTipos recibe un array como parametro
    res.json('pokemon agregado con exito')
  } catch (error) {
    res.json(error)
  }
})
/* {
  "nombre": "edwin",
  "vida": 10,
  "fuerza": 4,
  "defensa": 4,
  "velocidad":6,
  "altura":20,
  "peso":10,
  "tipos": [1,2]
} */

module.exports = pokemons;