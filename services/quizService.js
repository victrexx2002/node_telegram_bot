const axios = require('axios');
const bot = require('../bot'); // Assuming your bot instance is exported from another file

async function getRandomQuiz(chatId) {
  try {
    const triviaAPIUrl = 'https://opentdb.com/api.php?amount=1';

    const response = await axios.get(triviaAPIUrl);
    const quizData = response.data.results[0];

    const question = quizData.question;
    const encodedQuestion = encodeURIComponent(question); 
    const correctAnswer = decodeURIComponent(quizData.correct_answer).toLowerCase().trim(); 
    console.log(correctAnswer);

    await bot.sendMessage(chatId, question);

    const userAnswer = await waitForUserReply(chatId, 60000);

    if (userAnswer.toLowerCase().trim() === correctAnswer) {
      await bot.sendMessage(chatId, 'Congratulations! That\'s correct.');
    } else {
      await bot.sendMessage(chatId, `The correct answer is: "${correctAnswer}".`);
    }
  } catch (error) {
    console.error('Error getting quiz question:', error);
    await bot.sendMessage(chatId, 'Error getting quiz question. Please try again later.');
  }
}

async function waitForUserReply(chatId, timeout) {
  return new Promise((resolve, reject) => {
    const filter = (msg) => msg.chat.id === chatId;
    const onMessage = (msg) => {
      resolve(msg.text);
    };
    bot.on('message', onMessage, { filter });

    setTimeout(() => {
      reject(new Error('Timeout waiting for reply'));
    }, timeout);
  });
}

module.exports = { getRandomQuiz };