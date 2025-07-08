async function fetchJson(url) {
    const response = await fetch(url)
    const data = response.json()
    return data
}


async function getDashboardData(query) {
    try {
        const destinationsData = fetchJson(`http://localhost:3333/destinations?search=${query}`)
        const weathersData = fetchJson(`http://localhost:3333/weathers?search=${query}`)
        const airportData = fetchJson(`http://localhost:3333/airports?search=${query}`)
        const [destinations, weathers, airports] = await Promise.all([destinationsData, weathersData, airportData])
        const destination = destinations[0]
        const weather = weathers[0]
        const airport = airports[0]
        return {
            city:destination ? destination.name : null,
            country: destination ? destination.country : null,
            temperature: weather ? weather.temperature : null,
            weathers: weather ? weather.weather_description : null,
            airport: airport ? airport.name : null 
        }

    }catch(error){
        throw new Error(`Dati della città non trovati: ${error.message}`)
    }
    
}

(async () => {
    try {
        const data = await getDashboardData('london')
        console.log(data)
        let description = ''
        if(data.city !== null && data.country !== null){
            description += `${data.city} is in ${data.country}.\n` 
        }
        if(data.temperature !== null && data.weathers !== null){
            description += `Today there are ${data.temperature} degrees and the weather is ${data.weathers}.\n`
        }
        if(data.airport !== null){
            description += `The main airport is ${data.airport}.\n`
        }
        console.log(description)

    } catch (error) {
        console.error(error)
    };
})();