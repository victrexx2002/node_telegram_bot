const http = require('http');
const bot = require('./bot');
const port = process.env.PORT || 3000; 

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('My Telegram bot is running\n');
}).listen(port, () => {
  bot.startPolling()  
  console.log(`Server running on port ${port}`);

});