//.env protects api passcodes 
require("dotenv").config();


var keys = require("./keys.js");
var Spotify = require("node-spotify-api")
var dateFormat = require("dateFormat")
var request = require("request");
var fs = require("fs")



/******* Concerts ******/
//node liri.js concert-this <artist/band name here>

var concertThis = function (artist) {
    var region = ""
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    //url from coding bootcamp 

    request(queryUrl, function (err, response, body) {
        if (!err && response.statusCode === 200) { 
            var concertInfo = JSON.parse(body) //parses the data to become a javascript object

            outputData(artist + " concert information:") 
            for (i = 0; i < concertInfo.length; i++) { //pulls the bands tour info 
                region = concertInfo[i].venue.region //info for venue and location 
                if (region === "") {
                    region = concertInfo[i].venue.country
                }  
                //outputs the data for: venue, location & date 
                outputData("Location: " + concertInfo[i].venue.city + ", " + region);
                outputData("Date: " + dateFormat(concertInfo[i].datetime, "mm/dd/yyyy"))
                outputData("Venue: " + concertInfo[i].venue.name)
            }
        }
    })
}


/******* Spotify ****/
//node liri.js spotify-this-song '<song name here>'






/******* OMDB ******/
//node liri.js movie-this '<movie name here>'










/******** "I want it that way" -song *******/
//node liri.js do-what-it-says


/********* consoles information and writes it to the log file *********/
var outputData = function(data) {
    console.log(data)

    fs.appendFile("log.txt", "\r\n" + data, function (err){
        if(err){
            return console.log(err)
        } 
    })
}


var runAction = function(func, parm) {
    switch (func) {
        case "concert-this":
            concertThis(parm)
            break
        case "spotify-this-song":
            spotifyThisSong(parm)
            break
        case "movie-this":
            movieThis(parm)
            break
        case "do-what-it-says":
            doWhatItSays()
            break
        default:
            outputData("That is not a command that I recognize, please try again.") 
    }
}


runAction(process.argv[2], process.argv[3])