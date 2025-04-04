const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Handlers (unchanged from original)
function respondText(req, res) {
  res.type('text/plain').send('hi');
}

function respondJson(req, res) {
  res.json({ text: 'hi', numbers: [1, 2, 3] });
}

function respondEcho(req, res) {
  const input = req.query.input || '';
  res.json({
    normal: input,
    shouty: input.toUpperCase(),
    charCount: input.length,
    backwards: [...input].reverse().join('')
  });
}

function respondNotFound(req, res) {
  res.status(404).type('text/plain').send('Not Found');
}

// Express routes (clean mapping)
app.get('/', respondText);
app.get('/json', respondJson);
app.get('/echo', respondEcho);

// 404 handler (must be last)
app.use(respondNotFound);

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});