const { default: axios } = require("axios");

const apiOmie = axios.create({
  baseURL: process.env.OMIE_API_URL,
  timeout: 10000, // tempo limite em milissegundos
  headers: {
    "Content-Type": "application/json",
  },
});

module.exports = { apiOmie };
