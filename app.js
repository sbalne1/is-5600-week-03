const http = require('http');
const url = require('url');

const port = process.env.PORT || 3000;

// Plain text response
function respondText(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('hi');
}

//  JSON response
function respondJson(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ text: 'hi', numbers: [1, 2, 3] }));
}

// 404 Not Found response
function respondNotFound(req, res) {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
}

// Routing logic
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const path = parsedUrl.pathname;

  if (path === '/text') {
    respondText(req, res);
  } else if (path === '/json') {
    respondJson(req, res);
  } else {
    respondNotFound(req, res); // Reusable 404 handler
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});const http = require('http');
const url = require('url');

const port = process.env.PORT || 3000;

// Handlers
function respondText(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('hi');
}

function respondJson(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ text: 'hi', numbers: [1, 2, 3] }));
}

function respondNotFound(req, res) {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
}

// Server with routing
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true); // `true` parses query strings
  const pathname = parsedUrl.pathname;

  console.log('Request:', pathname); // Logging for debugging

  if (pathname === '/') return respondText(req, res);
  if (pathname === '/json') return respondJson(req, res);

  respondNotFound(req, res); // Catch-all for 404s
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});