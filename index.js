// search for african urban cities by name
// get the list of urban cities in africa as provided by the teleport open api

import express  from 'express';
import { getAfricanUrbanAreas } from './getAreas.js';
import { getUrbanArea } from './getArea.js';

const app = express()

// get the list of african urban areas
app.get('/api/urbanareas', async(req, res)=>{
    // get the cities in 
    const urbanAreas = await getAfricanUrbanAreas()
    if (urbanAreas.length > 0){
        res.send(JSON.stringify(urbanAreas))
    } else{
        res.status(404)
        res.send('no urban cities found')
    }
})


// search an african urban area by name
app.get('/api/urbanareas/:name', async(req, res)=>{
    const areaName = req.params.name
    const area = await getUrbanArea(areaName)
    if (area !== null){
        res.send(JSON.stringify(area))
    }else{
        res.status(404)
        res.send('area not found')
    }
})

app.listen(3000, ()=> console.log('listening.................................................'))