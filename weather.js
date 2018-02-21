const https = require('https');
// In node.js you can require json files as well as js modules.
const api = require('./api.json');


// Print out the temp details
function printWeather(weather) {
  const message = `The current temperature in ${weather.location.city} is ${weather.current_observation.temp_c}C`;
  console.log(message);
}

// Print out error message
function printError(error) {
  console.error(error.message);
}

// get function that takes in the query from command line arguments.
function get(query) {
  // Takeout underscores for readability.
  const readableQuery = query.replace('_', ' ');
  try {
    const request = https.get(`https://api.wunderground.com/api/${api.key}/geolookup/conditions/q/${query}.json`, response => {
        if (response.statusCode === 200) {
          let body = "";
        
          // Read incoming data from weather underground
          response.on('data', data => {
          body += data.toString();
        });
        response.on('end', () => {
          try {
            // Parse data from the JSON string in 'body' to an object
            const weather = JSON.parse(body);
            // Check if location found before calling printWeather
            if (weather.location) {
              // Print the found location
              printWeather(weather);
            } else {
              const queryError = new Error(`The location "${readableQuery}" was not found.`);
              printError(queryError);
            }
          } catch (error) {
            // Parse error
            printError(error);
          }
        });
    
      } else {
        //Status Code Error in human readable format
        const statusCodeError = new Error(`There was an error getting the message for ${readableQuery}. (${http.STATUS_CODES[response.statusCode]})`);
        printError(statusCodeError);
      }
  
    });
  
    request.on("error", printError);

  } catch (error) {
    // Malformed URL error
    printError(error);
  }

}

module.exports.get = get;

// TODO: error handlers