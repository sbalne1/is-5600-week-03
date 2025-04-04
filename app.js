const express = require('express');
const path = require('path');
const EventEmitter = require('events');
const app = express();
const port = process.env.PORT || 3000;

// Configuration
const config = {
  staticFiles: path.join(__dirname, 'public'),
  chatHTML: path.join(__dirname, 'chat.html')
};

// Event emitter for real-time messaging
const chatEmitter = new EventEmitter();

// Middleware
app.use(express.static(config.staticFiles));

// Utility function for message validation
const validateMessage = (message) => {
  if (!message?.trim()) {
    throw new Error('Message cannot be empty');
  }
  return message.trim();
};

// Route Handlers
const handleChatRoute = (req, res) => {
  try {
    const { message } = req.query;
    const cleanMessage = validateMessage(message);
    
    console.log(`Broadcasting message: "${cleanMessage}"`);
    chatEmitter.emit('message', cleanMessage);
    res.end();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const handleSSEConnection = (req, res) => {
  // Set SSE headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  // Send initial message
  res.write('data: Connected to chat\n\n');

  const messageHandler = (msg) => {
    res.write(`data: ${msg}\n\n`);
  };

  chatEmitter.on('message', messageHandler);

  req.on('close', () => {
    chatEmitter.off('message', messageHandler);
    console.log('Client disconnected');
  });
};

// Routes
app.get('/', (req, res) => res.sendFile(config.chatHTML));
app.get('/chat', handleChatRoute);
app.get('/sse', handleSSEConnection);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Server startup
app.listen(port, () => {
  console.log(`
  Chat App running:
  - Home:    http://localhost:${port}/
  - JSON:    http://localhost:${port}/json
  - Echo:    http://localhost:${port}/echo?input=test
  - Chat UI: http://localhost:${port}/chat.html
  `);
});