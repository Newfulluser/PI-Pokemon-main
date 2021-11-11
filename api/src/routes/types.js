const { Router } = require('express');
const types = Router();
const axios= require('axios')
const { Tipo } = require('../db');

types.get('/',async(req,res)=>{
  try {
    const dbType= await Tipo.findAll()
    if (dbType.length===0) {
      const axiosResult= await axios({method: 'GET', url: 'https://pokeapi.co/api/v2/type'}) // array de objetos con name y url
      const tipos= axiosResult.data.results
      const arr= tipos.map(element=>{
        const result= element.url.split('/')
        return {
          id_tipo: result[result.length-2],
          nombre:element.name
        }
      })
      Tipo.bulkCreate(arr)
      dbType= await Tipo.findAll()
    }
    res.json(dbType)     
  } catch (error) {
    res.json(error)
  }
})


module.exports= types