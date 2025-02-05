import React, { useEffect, useState } from 'react';

const Websocket = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socket = React.useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection
    socket.current = new WebSocket('ws://localhost:8080');

    // Handle incoming messages
    socket.current.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    // Cleanup on unmount
    return () => {
      socket.current.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket.current && input.trim()) {
      socket.current.send(input);
      setInput('');
    }
  };

  return (
    <div>
      <h2>WebSocket Example</h2>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default Websocket;