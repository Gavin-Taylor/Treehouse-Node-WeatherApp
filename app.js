// WeatherUnderground api key - 37ed3fa156a1acc2, project name - weatherapp, 

// If type in zipcode in command line should get current temp in that area
// Should also be able to type city and state.

// 1st retreive the data and log out the body of the response

const weather = require('./weather');

// Join multiple values passed as arguments and replace all spaces with underscores.
const query = process.argv.slice(2).join("_").replace(' ', '_');
// query: 90210
// query: Cleveland_ON
// query: London_England

// Pass query into the weather module's get function
weather.get(query);


