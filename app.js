const http = require('http');
const url = require('url');

const port = process.env.PORT || 3000;

const server = http.createServer(function(request, response) {
  // 1. Set JSON content type header
  response.setHeader('Content-Type', 'application/json');
  
  // Send a JSON response instead of plain text
  response.end(JSON.stringify({ text: 'hi', numbers: [1, 2, 3] }));
});

server.listen(port, function() {
  console.log(`Server is listening on port ${port}`);
});