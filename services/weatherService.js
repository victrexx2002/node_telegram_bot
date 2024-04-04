const axios = require('axios');
const bot = require('../bot')

const weatherAPIUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = 'dcc401f00c49b0c34bf912f238172d9c';

async function getWeather(chatId) {
  try {
    const city = await askForCity(chatId, 60000);
    const response = await axios.get(`${weatherAPIUrl}${city}&appid=${apiKey}`);
    const weather = response.data.main;
    const description = response.data.weather[0].description;
    console.log(weather, description)
    const temperature = Math.floor(weather.temp - 273.15); // Convert Kelvin to Celsius

    await bot.sendMessage(chatId, `Weather in ${city}: ${description}, Temperature: ${temperature}°C`);
  } catch (error) {
    console.error(error);
    throw new Error('Error getting weather data.');
  }
}

async function askForCity(chatId, timeout) {
  return new Promise((resolve, reject) => {
    const filter = (msg) => msg.chat.id === chatId;
    const onMessage = (msg) => {
      console.log(msg)
      resolve(msg.text);
    };
    bot.on('message', onMessage, { filter });

    setTimeout(() => {
      reject(new Error('Timeout waiting for reply'));
    }, timeout);

    bot.sendMessage(chatId, "Please enter the city you'd like weather for (e.g., London, New York).");
  });
}


module.exports = { getWeather };