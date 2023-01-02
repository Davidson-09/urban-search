import fetch from 'node-fetch';

//url endpoint from teletport open api to get the list of urban cities in the African continent
const africanCitiesUrl = 'https://api.teleport.org/api/continents/geonames%3AAF/urban_areas/'

const getAfricanUrbanAreas =async()=>{
    let areas = []
    await fetch(africanCitiesUrl).then(async(res)=>{
        const response = await res.json()
        areas = response._links['ua:items']
    }).catch(e =>{
        console.log(e)
    })
    return areas
}

export{getAfricanUrbanAreas}