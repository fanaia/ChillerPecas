const axios = require('axios');

const apiRetaguarda = axios.create({
  baseURL: process.env.RETAGUARDA_API_URL,
  headers: {
    "Content-Type": "application/json",
    'Authorization': `Bearer ${process.env.RETAGUARDA_TOKEN}`
  },
});

module.exports = { apiRetaguarda };
