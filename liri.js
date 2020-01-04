/*COMMANDS   
     concert-this
     spotify-this-song
     movie-this
     do-what-it-says   */


     
//sets enviornmental variables 
require("dotenv").config();


var keys = require("./keys.js");

//spotify 
var spotify = new Spotify(keys.spotify);

