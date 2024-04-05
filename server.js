const http = require('http');
const bot = require('./bot');
const port = 3000;
require("./main")


http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('My Telegram bot is running\n');
}).listen(port, () => {
  console.log(`Server running on port ${port}`);
});