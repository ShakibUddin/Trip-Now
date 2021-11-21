const productionUrl = 'https://trip-now.herokuapp.com';
const developmentUrl = 'http://localhost:5000';
const development = true;
const serverUrl = development ? developmentUrl : productionUrl;
module.exports = { serverUrl };