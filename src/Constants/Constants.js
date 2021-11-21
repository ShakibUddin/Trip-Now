const productionUrl = 'https://trip-now.herokuapp.com';
const developmentUrl = 'http://localhost:5000';
const development = false;
const serverUrl = development ? developmentUrl : productionUrl;
module.exports = { serverUrl };