const WebSocket = require('websocket');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
  console.log('Client connected');

  // Send a message to the client
  socket.send('Welcome to the WebSocket server!');

  // Receive messages from the client
  socket.on('message', (message) => {
    console.log(`Received: ${message}`);
    // Echo back the message
    socket.send(`You said: ${message}`);
  });

  // Handle disconnection
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});