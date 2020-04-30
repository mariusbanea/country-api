/* This app doesn't follow a11y best practices, and the JS file is incomplete.

Complete the getDataFromApi and displaySearchData functions.

When you're done, this app should allow a user to search for a country, and display the name of that country, followed by a list of the country's population, capital and region.

You should make requests to this API: https://restcountries.eu/ .

Also make any necessary adjustments to make this app accessible. */


//Step 1 - watch for user input; tell shopkeeper what shoe size, color
function watchSubmit() {

    //Step 1a - create a trigger
    $('.js-search-form').submit(event => {
        //if the page refreshes when you submit the form use "preventDefault()" to force JavaScript to handle the form submission
        event.preventDefault();

        //Step 1b - get user input - get the artist value from the input box
        let query = $('.js-query').val();

        //Step 1c - input validation - validate artist
        if (query == '') {
            alert("Please select a country");
        } else {
            getDataFromApi(query, displaySearchData);
        }

    });
}


//Step 2 - define the function to make the api call; shopkeeper goes to warehouse to get shoe
function getDataFromApi(searchTerm, callback) {
    console.log(searchTerm);

    //Step 2a - create the url
    const url = `https://restcountries.eu/rest/v2/name/${searchTerm}`;
    console.log(url);

    // Step 2b - make the api call using the URL, dataType (JSON or JSONP), type (GET or POST)
    fetch(url)

        //Step 2c - success scenario (call the function to display the results)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            // DISPLAY ERRORS if the server connection works but the json data is broken
            throw new Error(response.statusText);
        })
        .then(responseJson => displaySearchData(responseJson))

        // Step 2d - failure scenario (DISPLAY ERRORS if the server connection fails)
        .catch(err => {
            console.log(err);
        });
}


//Step 3 - display the results; sales process
function displaySearchData(responseJson) {

    //Step 3a - console.log the results
    console.log(responseJson);

    //Step 3b - if there are no results show errors (DISPLAY ERRORS if the server connection works and the json data is valid, but there are no resutls)
    if (responseJson.length == 0) {

        //show an alert
        alert("No results");
    }
    //Step 3c - if there are results, create an HTML results variable
    else {
        let htmlOutput = "";

        //Step 3d - populate the htmlOutut variable with all the relevant data
        for (let i = 0; i < responseJson.length; i++) {
            htmlOutput +=`
                <p> ${responseJson[i].name}</p><br />
                <p> ${responseJson[i].population}</p>
                <p> ${responseJson[i].capital}</p>
                <p> ${responseJson[i].region}</p>
            `;
        }

        //Step 3e - send the content of HTML results variable to the HTML
        $('.js-search-results').html(htmlOutput);
    }
}


$(watchSubmit);
