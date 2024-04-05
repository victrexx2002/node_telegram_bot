const weatherService = require('./services/weatherService'); // Import weather service
const quotesService = require('./services/quotesService'); // Import quotes service
const quizService = require('./services/quizService'); // Import quiz service
const bot = require('./bot');

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text.toLowerCase();

  if (text === '/start') {
    bot.sendMessage(chatId, 'Hi! I\'m here to provide you with weather information, inspirational quotes, or fun quizzes. Choose from the following options:');
    bot.sendMessage(chatId, '/weather - Get the current weather for your location');
    bot.sendMessage(chatId, '/quote - Get a random inspirational quote');
    bot.sendMessage(chatId, '/quiz - Take a challenging quiz');
  } else {
    if (text === '/weather') {
      try {
        await weatherService.getWeather(chatId);
        bot.sendMessage(chatId, 'Weather information retrieved successfully!');
      } catch (error) {
        console.error('Error getting weather data:', error); 
        bot.sendMessage(chatId, 'Error occurred while retrieving weather data. Please try again later.');
      }
    } else if (text === '/quote') {
      try {
        const quote = await quotesService.getRandomQuote(chatId);
        bot.sendMessage(chatId, quote);
      } catch (error) {
        console.error('Error getting quote:', error); 
        bot.sendMessage(chatId, 'Error occurred while fetching a quote. Please try again later.');
      }
    } else if (text === '/quiz') {
      try {
        await quizService.getRandomQuiz(chatId);
      } catch (error) {
        console.error('Error getting quiz question:', error); 
        bot.sendMessage(chatId, 'Error occurred while retrieving a quiz question. Please try again later.');
      }
    }
  }
});

bot.startPolling()