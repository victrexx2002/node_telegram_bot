const axios = require('axios');
const bot = require('../bot'); // Assuming your bot instance is exported from another file

async function getRandomQuiz(chatId) {
  try {
    // Replace with your Trivia API endpoint (or any other quiz source)
    const triviaAPIUrl = 'https://opentdb.com/api.php?amount=1';

    // Fetch trivia question
    const response = await axios.get(triviaAPIUrl);
    const quizData = response.data.results[0];

    const question = quizData.question;
    const encodedQuestion = encodeURIComponent(question); // Encode for special characters
    const correctAnswer = decodeURIComponent(quizData.correct_answer).toLowerCase().trim(); // Convert to lowercase and trim white spaces

    console.log(correctAnswer); // For debugging purposes (remove if not needed)

    // Send the question to the user
    await bot.sendMessage(chatId, question);

    // Wait for user reply with a timeout
    const userAnswer = await waitForUserReply(chatId, 60000); // 60 seconds timeout

    // Check user's answer
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

    // Set timeout
    setTimeout(() => {
      reject(new Error('Timeout waiting for reply'));
    }, timeout);
  });
}

module.exports = { getRandomQuiz };