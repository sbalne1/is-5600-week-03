const express = require('express');
const path = require('path');
const EventEmitter = require('events');
const app = express();
const port = process.env.PORT || 3000;

// Event emitter for real-time messaging
const chatEmitter = new EventEmitter();

// Middleware
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'chat.html'));
});

app.get('/chat', (req, res) => {
  const { message } = req.query;
  
  if (!message?.trim()) {
    return res.status(400).send('Message cannot be empty');
  }

  const cleanMessage = message.trim();
  console.log(`Broadcasting message: "${cleanMessage}"`);
  chatEmitter.emit('message', cleanMessage);
  res.end();
});

app.get('/sse', (req, res) => {
  // Set SSE headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  // Send initial message
  res.write('data: Connected to chat\n\n');

  // Message handler
  const messageHandler = (msg) => {
    res.write(`data: ${msg}\n\n`);
  };

  // Register handler
  chatEmitter.on('message', messageHandler);

  // Cleanup on disconnect
  req.on('close', () => {
    chatEmitter.off('message', messageHandler);
    console.log('Client disconnected');
  });
});

app.listen(port, () => {
  console.log(`Chat App running:`);
  console.log(`- Home:    http://localhost:${port}/`);
  console.log(`- JSON:    http://localhost:${port}/json`);
  console.log(`- Echo:    http://localhost:${port}/echo?input=test`);
  console.log(`- Chat UI: http://localhost:${port}/chat.html`);
});