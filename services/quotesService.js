const axios = require('axios');
const bot = require('../bot')

const quotesAPIUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

async function getRandomQuote(chatId) {
  try {
    const response = await axios.get(quotesAPIUrl);
    const quoteData = response.data.quoteText;
    const author = response.data.quoteAuthor;
    console.log(quoteData, author)

    return `"${quoteData}" - ${author}`;
  } catch (error) {
    console.error(error);
    throw new Error('Error getting quote.');
  }
}

module.exports = { getRandomQuote };