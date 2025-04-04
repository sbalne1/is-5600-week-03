const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');

// Connect to SSE
const eventSource = new EventSource('/sse');
eventSource.onmessage = (e) => {
  const msg = document.createElement('p');
  msg.textContent = e.data;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
};

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (message) {
    fetch(`/chat?message=${encodeURIComponent(message)}`);
    input.value = '';
  }
});