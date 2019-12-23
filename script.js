/**
 * Music app.
 * 
 */
const resultCardsEl = document.querySelector('#result-cards');
const searchFormEl = document.querySelector('#search-form');
const searchEl = document.querySelector('#search');
const anyRadioEl = document.querySelector('#any');
const artistRadioEl = document.querySelector('#artist');
const albumRadioEl = document.querySelector('#album');
const trackRadioEl = document.querySelector('#track');
const tracklistEl = document.querySelector('#tracklist');



// Get value from input field
let searchUrl;
let url;
let tracklistUrl;
const getUrl = (checkedUrl) => {
    searchUrl = checkedUrl;
    url = searchUrl + searchEl.value.split('').join(''); //.split('').join(' ') ifall jag vill lägga till dash mellan orden (-)
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

const renderArtistResults = (results) => {
    results.data.forEach(result => {
        const resultHTML = `
            <div class="col-sm-12 col-md-6 col-lg-4 mt-3">
                <div class="card">
                    <img src="${result.picture_big}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${result.name}</h5>
                        <h6>Fans: ${result.nb_fan}</h6>
                        <h6>Album: ${result.nb_album}</h6>
                    </div>
                </div>
            </div>
        `;
        return resultCardsEl.innerHTML += resultHTML;
    });
};

// Get tracklist url
const getTracklistUrl = (checkedUrl) => {
    tracklistUrl = checkedUrl;
};

const renderTracklist = (tracks) => {
    tracks.data.forEach(track => {       
        const trackHTML = `
        <li>${track.title}</li>
        `;
        console.log(trackHTML);
        return tracklistEl.innerHTML += trackHTML;
    });
};

const renderAlbumResults = (results) => {
    
    results.data.forEach(result => {
        const resultHTML = `
            <div class="col-sm-12 col-md-6 col-lg-4 mt-3">
                <div class="card">
                    <img src="${result.cover_big}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${result.title}</h5>
                        <h6>Artist: ${result.artist.name}</h6>
                        <h6>Tracklist: </h6>
                        <ol id="tracklist"></ol>
                    </div>
                </div>
            </div>
        `; 
        resultCardsEl.innerHTML += resultHTML;
        getTracklistUrl("https://deezerdevs-deezer.p.rapidapi.com/album/" + result.id + "/tracks");
        getMusic(tracklistUrl).then(renderTracklist).catch(err => err);
    });
};


const renderTrackResults = (results) => {
    results.data.forEach(result => {
        const resultHTML = `
            <div class="col-sm-12 col-md-6 col-lg-4 mt-3">
                <div class="card">
                    <img src="${result.album.cover_big}" class="card-img-top" alt="...">
                    <audio controls>
                            <source src="${result.preview}" type="audio/mpeg">
                        </audio>
                    <div class="card-body">
                        <h5 class="card-title">${result.title}</h5>
                        <h6>${result.artist.name}</h6>
                        <p>${result.album.title}</p>
                        <p>${Math.floor(result.duration / 60)} min ${result.duration % 60} sec</p>
                    </div>
                </div>
            </div>
        `;
        return resultCardsEl.innerHTML += resultHTML;
    });
};

searchFormEl.addEventListener('submit', function(e) {
    e.preventDefault();
    // empty inputfield  and search result
    url = searchUrl + searchEl.value;
    resultCardsEl.innerHTML = "";
    
    // which radio button is selected
    if (anyRadioEl.checked) {
        getUrl("https://deezerdevs-deezer.p.rapidapi.com/search?q=");
        getMusic(url).then(renderSearchResults).catch(err => {
            alert("Error getting search result. Error was: " + err);
        });
    } else if (artistRadioEl.checked) {
        getUrl("https://deezerdevs-deezer.p.rapidapi.com/search/artist?q=");
        getMusic(url).then(renderArtistResults).catch(err => {
            alert("Error getting search result. Error was: " + err);
        });
    } else if (albumRadioEl.checked) {
        getUrl("https://deezerdevs-deezer.p.rapidapi.com/search/album?q=");
        getMusic(url).then(renderAlbumResults).catch(err => {
            alert("Error getting search result. Error was: " + err);
        }); 
        
    } else if (trackRadioEl.checked) {
        getUrl("https://deezerdevs-deezer.p.rapidapi.com/search/track?q=");
        getMusic(url).then(renderTrackResults).catch(err => {
            alert("Error getting search result. Error was: " + err);
        });
    } else {
        getUrl("https://deezerdevs-deezer.p.rapidapi.com/search?q=");
        getMusic(url).then(renderSearchResults).catch(err => {
            alert("Error getting search result. Error was: " + err);
        });
    }
});

