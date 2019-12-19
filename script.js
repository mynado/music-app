/**
 * Music app.
 * 
 */
const resultCardsEl = document.querySelector('#result-cards');
const searchFormEl = document.querySelector('#search-form');
const searchEl = document.querySelector('#search');
const artistCheckboxEl = document.querySelector('#artist');
const albumCheckboxEl = document.querySelector('#album');
const trackCheckboxEl = document.querySelector('#track');


// Get value from input field
let searchUrl;
let url;
const getUrl = (checkedUrl) => {
    console.log("checkedUrl", checkedUrl);
    searchUrl = checkedUrl;
    url = searchUrl + searchEl.value.split('-');
    console.log(url)
};


const getMusic = async (url) => {
    const response = await fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "0428f3ba20msh040c736c17f91cfp145ccajsn9fc130114d20"
        }
    });
    if (!response.ok) {
        throw new Error("Response was not OK.");
    } 
   
    return await response.json();
};

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
                        
                    </div>
                </div>
            </div>
        `;
        resultCardsEl.innerHTML += resultHTML;
    });

};


searchFormEl.addEventListener('submit', function(e) {
    e.preventDefault();
    // empty inputfield  and search result
    url = searchUrl + searchEl.value;
    resultCardsEl.innerHTML = "";
    
    // check if the checkbox are checked
    if (albumCheckboxEl.checked && artistCheckboxEl.checked && trackCheckboxEl.checked) {
        getUrl("https://deezerdevs-deezer.p.rapidapi.com/search?q=");
        getMusic(url).then(renderSearchResults).catch(err => {
            alert("Error getting search result. Error was: " + err);
        });
    } else if (artistCheckboxEl.checked) {
        getUrl("https://deezerdevs-deezer.p.rapidapi.com/search?q=artist:");
        getMusic(url).then(renderSearchResults).catch(err => {
            alert("Error getting search result. Error was: " + err);
        });
    } else if (albumCheckboxEl.checked) {
        getUrl("https://deezerdevs-deezer.p.rapidapi.com/search?q=album:");
        getMusic(url).then(renderSearchResults).catch(err => {
            alert("Error getting search result. Error was: " + err);
        });
    } else if (trackCheckboxEl.checked) {
        getUrl("https://deezerdevs-deezer.p.rapidapi.com/search?q=track:");
        getMusic(url).then(renderSearchResults).catch(err => {
            alert("Error getting search result. Error was: " + err);
        });
    } else {
        getUrl("https://deezerdevs-deezer.p.rapidapi.com/search?q=");
        getMusic(url).then(renderSearchResults).catch(err => {
            alert("Error getting search result. Error was: " + err);
        });
    }
});

