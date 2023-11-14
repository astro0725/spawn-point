
const RAWG_KEY = `?token&key=aaadbe900b0f429ea88c22d1c7f9badf`;    // key for SDR
const RAWG_URL = `https://rawg.io/api/`;

/*
   rawg.io Fetch function: fetch a json response based on search param
   accepts a query parameter, the url to push the parameter to, and the key
   returns the json response from the server
*/
const rawgFetch = function(queryParam, url, key)
{
    
    console.log(url+queryParam+key);

    return fetch(url+queryParam+key)
    .then(function(response)
    {
        return response.json();
    }); // end then
} // end rawgFetch

/*
   getGameByName function: fetch request to the RAWG API. This will pass argument
   as a query parameter to the server.
   it will accept a game name argument - function error handles empty, erroneous spaces,
   and unacceptable special characters (out of ASCII range, endl, tabs, etc)
   returns a JSON of the request from the RAWG server
*/
const displayResults = function (results) {
    const resultsContainer = document.getElementById("results");
    
     // Clear previous results
    resultsContainer.innerHTML = '';
    
     // Check if there are results
     if (results.results.length === 0) {
    resultsContainer.textContent = "No results found.";
    return;
     }

     // Create an unordered list to hold the results
     const resultList = document.createElement("ul");
    
 // Create an image element
 const imageElement = document.createElement("img");
 imageElement.src = result.background_image; // Use the API-provided image URL
 imageElement.alt = result.name; // Set alt text for accessibility
 imageElement.style.maxWidth = "100px"; // Set a maximum width for the image (adjust as needed)




    }