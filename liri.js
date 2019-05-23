require("dotenv").config();

let keys = require("./keys.js");
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
let moment = require('moment');
let axios = require('axios');
let fs = require('fs');

let command = process.argv[2];
let input = process.argv[3];


if (command === "concert-this") {
    concertResults(input);
} else if (command === "spotify-this-song") {
    spotifyResults(input);
} else if (command === "movie-this") {
    movieResults(input);
} else if ("do-what-it-says") {
    doItResults(input);
};

function concertResults(input) {
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp") 
    .then(function(response) {    
        for (var i = 0; i < 7; i++) {

            let datetime = response.data[i].datetime;
            let dateArray = datetime.split('T');

            let concertData = 
                "=========================================================================" +
                    "\n Venue: " + response.data[i].venue.name + 
                    "\n Location: " + response.data[i].venue.city +
                    "\n Date: " + moment(dateArray[0], "MM-DD-YYYY"); 
            console.log(concertData);
            // fghdthsf
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

function spotifyResults(input) {
    if(!input){
        input = "The Sign";
    }
    spotify
    .search({ type: 'track', query: input })
    .then(function(response) {
        for (var i = 0; i < 4; i++) {
            let spotifyData = 
                "========================================================================" +
                    "\n Artist: " + response.tracks.items[i].artists[0].name + 
                    "\n Song: " + response.tracks.items[i].name +
                    "\n Album: " + response.tracks.items[i].album.name +
                    "\n Preview: " + response.tracks.items[i].external_urls.spotify;
                    
            console.log(spotifyData);
        }
    })
    .catch(function(error) {
        console.log(error);
    });
}

function movieResults(input) {
    if ( !input ){
        input = "Mr Nobody";
    }
    axios.get("https://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=f0dc3367")
    .then(function(response) {
            let movieData = 
                "========================================================================" +
                    "\n Title: " + response.data.Title + 
                    "\n Year: " + response.data.Year +
                    "\n IMDB Rating: " + response.data.imdbRating +
                    "\n Rotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                    "\n Country: " + response.data.Country +
                    "\n Language: " + response.data.Language +
                    "\n Plot: " + response.data.Plot +
                    "\n Cast: " + response.data.Actors
            console.log(movieData);
    })
    .catch(function (error) {
        console.log(error);
    });


    
};

// return
function doItResults(input) {

    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        let dataArray = data.split(',');
        spotifyResults(dataArray[0], dataArray[1]);
    })
};