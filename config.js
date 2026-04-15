require("dotenv").config();

module.exports = {
  openApiKey: {
    apiUrl: process.env.OPEN_ROUTE_URL,
    apiKey: process.env.OPEN_ROUTE_API_KEY,
  },
};
