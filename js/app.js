async function fetchJson(url) {
    const response= await fetch(url)
    const data = response.json()
    return data
}


async function getDashboardData(query) {
    const destinationsData = fetchJson(`http://localhost:3333/destinations?search=${query}`)
    const weathersData = fetchJson(`http://localhost:3333/weathers?search=${query}`)
    const airportData = fetchJson(`http://localhost:3333/airports?search=${query}`)
    const [destinations, weathers, airport] = await Promise.all([destinationsData,weathersData,airportData])
    return {
        city : destinations[0].name,
        country : destinations[0].country,
        temperature : weathers[0].temperature,
        weathers :weathers[0].weather_description,
        airport : airport[0].name
    }
}

(async()=>{
    const data = await getDashboardData('london')
    console.log(data)
    console.log(
            `${data.city} is in ${data.country}.\n` +
            `Today there are ${data.cityTemperature} degrees and the weather is ${data.cityWeathers}.\n`+
            `The main airport is ${data.cityAirports}.\n`
        );
    
})();