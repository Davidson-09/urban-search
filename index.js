// search for african urban cities by name
// get the list of urban cities in africa as provided by the teleport open api

import express  from 'express';
import { getAfricanUrbanAreas } from './getAreas.js';
import { getUrbanArea } from './getArea.js';

const app = express()

app.get('/', (req, res)=>{
    res.send("hello, welcome to urban search")
})

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
    await getUrbanArea(areaName).then(area =>{
        if (area !== null ){
            res.send(JSON.stringify(area))
        }else{
            res.status(404)
            res.send('area not found')
        }
    })
    
})

const PORT = process.env.PORT || 3030;
app.listen(PORT, ()=> console.log(`server started on port ${PORT}`))