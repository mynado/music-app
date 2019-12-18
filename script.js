/**
 * Music app.
 * 
 */
const resultCardsEl = document.querySelector('#result-cards');
const searchFormEl = document.querySelector('#search-form');
const searchEl = document.querySelector('#search');


// Get value from input field
let searchUrl = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";
let url = searchUrl + searchEl.value.split('-');

 const getSongs = async (url) => {
    const response = await fetch(url, {
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
        const resultHTML = `
            <div class="col-sm-12 col-md-6 col-lg-4 mt-3">
                <div class="card">
                    <img src="${result.album.cover_big}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${result.title}</h5>
                        <h6>Artist: ${result.artist.name}</h6>
                        <h6>Album: ${result.album.title}</h6>
                        <p class="card-text">The younger sister of R&B diva Beyoncé, Solange Knowles started just as early as a performer...</p>
                    </div>
                </div>
            </div>
        `;
        resultCardsEl.innerHTML += resultHTML;
    });
};

searchFormEl.addEventListener('submit', function(e) {
    e.preventDefault();
    url = searchUrl + searchEl.value;
    resultCardsEl.innerHTML = "";
    getSongs(url).then(renderSearchResults).catch(err => {
        alert("Error getting artist. Error was: " + err);
    });
});

