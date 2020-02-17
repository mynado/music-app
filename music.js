const key = '0428f3ba20msh040c736c17f91cfp145ccajsn9fc130114d20';
/*
// get weather information
const getWeather = async (id) => {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};

// get city information
const getCity = async (city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query); 
    const data = await response.json();

    return data[0];
};
*/

const getSearch = async (search) => {
    const base = 'https://deezerdevs-deezer.p.rapidapi.com/search?q="';
    const query = `${search}`;

    const response = await fetch(base + query, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "0428f3ba20msh040c736c17f91cfp145ccajsn9fc130114d20"
        }
    });
    if (!response.ok) {
        throw new Error("Response was not OK.");
    } 
    const data = await response.json();
    return data[0];
    
    // return await response.json();
};

console.log(getSearch('eminem'));

