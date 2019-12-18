/**
 * Music app.
 * 
 */

// Get input

 const getArtist = async () => {
    const response = await fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=beyonce", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
		"x-rapidapi-key": "79e8812e73msh8da75390c6b6b51p184777jsn86eb54cfc71a"
	}
    });
    if (!response.ok) {
        throw new Error("Response was not OK.");
    }
   
    return await response.json();
}

const renderSearchResults = (results) => {
    results.data.forEach(result => {
        console.log(result);
    })
};

getArtist().then(renderSearchResults).catch(err => {
    alert("Error getting artist. Error was: " + err);
});
