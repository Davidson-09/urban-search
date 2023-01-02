import fetch from 'node-fetch';

const getUrbanArea =async (areaName)=>{
    let area = {}
    if (areaName){
        const cityUrl = `https://api.teleport.org/api/urban_areas/slug:${areaName}/`
        await fetch(cityUrl).then(async(res)=>{
            const response = await res.json()
            const links = response._links
            if (links){
                let cityObject = {imageUrl: links['ua:images']}
                // get the image
                const imageLinks = await getImageLinks(links['ua:images'].href)
                const photos = imageLinks.photos
                const webPhoto = photos[0].image.web

                // get the score of living in the area
                const scoreData = await getScores(links['ua:scores'].href)
                const scoreCategories = scoreData.categories

                // get the average salary
                const salaryData = await getSalaryData(links['ua:salaries'].href)
                const salaries = salaryData.salaries

                area = {name:areaName, photo:webPhoto, scores:scoreCategories, salaries}
                console.log(area)
            } else{
                console.log('nothing to see here')
            }
            
        }).catch(e =>{
            area = null
            console.log(e)
        })

        return(area)
    }
}

const getImageLinks =async(link)=>{
    let imageLinks
    await fetch(link).then(res=>{
        imageLinks = res.json()
    })
    return imageLinks
}

const getScores =async(link)=>{
    let scoreData
    await fetch(link).then(res=>{
        scoreData = res.json()
    })
    return scoreData
}

const getSalaryData =async(link)=>{
    // returns only data for web developer jobs
    let salaryData
    await fetch(link).then(res=>{
        salaryData = res.json()
    })
    return salaryData
}

export{getUrbanArea}