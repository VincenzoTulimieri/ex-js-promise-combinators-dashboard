async function fetchJson(url) {
    const response= await fetch(url)
    const data = response.json()
    return data
}


async function getDashboardData(query) {
    const destinations = fetchJson(`http://localhost:3333/destinations?search=${query}`)
    const weathers = fetchJson(`http://localhost:3333/weathers?search=${query}`)
    const airports = fetchJson(`http://localhost:3333/airports?search=${query}`)
    const results = await Promise.all([destinations,weathers,airports])
    return {
        city : results[0][0].name,
        country : results[0][0].country,
        temperature : results[1][0].temperature,
        weathers : results[1][0].weather_description,
        airport : results[2][0].name
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