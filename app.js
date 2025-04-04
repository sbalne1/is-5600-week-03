const http = require('http');
const url = require('url');

const port = process.env.PORT || 3000;

// Text response handler
function respondText(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('hi');
}

// JSON response handler
function respondJson(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ text: 'hi', numbers: [1, 2, 3] }));
}

// Main server request handler
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true); // Parse URL to get pathname
  const path = parsedUrl.pathname;

  // Simple routing logic
  if (path === '/text') {
    respondText(req, res);
  } else if (path === '/json') {
    respondJson(req, res);
  } else {
    // Default 404 response for unknown routes
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});