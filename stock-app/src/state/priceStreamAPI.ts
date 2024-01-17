type WebSocketDataCallback = (data: unknown) => void;

export const connectToWebSocket = (symbol: string, onDataReceived: WebSocketDataCallback): WebSocket => {
    const socket = new WebSocket('wss://ws.eodhistoricaldata.com/ws/crypto?api_token=demo');
  
    socket.onopen = () => {
      console.log(`WebSocket connected for ${symbol}`);
      socket.send(JSON.stringify({ 'action': 'subscribe', 'symbols': `${symbol}`}));
    };
  
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onDataReceived(data);
    };
  
    socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };
  
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  
    return socket;
  };


// Example 1

// type WebSocketDataCallback = (data: unknown) => void;

// export const connectToWebSocket = (symbol: string, onDataReceived: WebSocketDataCallback): WebSocket => {
//     const socket = new WebSocket('wss://finnhub.io/ws?token=cmjgslhr01qo8idm263gcmjgslhr01qo8idm2640');
  
//     socket.onopen = () => {
//       console.log(`WebSocket connected for ${symbol}`);
//       socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'AAPL' }));
//     };
  
//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log(data);
//       onDataReceived(data);
//     };
  
//     socket.onclose = (event) => {
//       console.log('WebSocket connection closed:', event);
//     };
  
//     socket.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };
  
//     // Keep the connection alive by sending a ping message every 30 seconds
//     setInterval(() => {
//       if (socket.readyState === WebSocket.OPEN) {
//         socket.ping();
//       }
//     }, 30000);
  
//     return socket;
// };

// Example 2

// type WebSocketDataCallback = (data: unknown) => void;

// export const connectToWebSocket = (symbol: string, onDataReceived: WebSocketDataCallback): WebSocket => {
//     const socket = new WebSocket('wss://finnhub.io/ws?token=cmjgslhr01qo8idm263gcmjgslhr01qo8idm2640');
  
//     socket.addEventListener('open', function (event) {
//       socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
      
//   });
  
//   // Listen for messages
//   socket.addEventListener('message', function (event) {
//       console.log('Message from server ', event.data);
//       onDataReceived(event.data);
//   });

//   // Listen for messages
//   socket.addEventListener('close', function (event) {
//     console.log('WebSocket connection closed:', event);
// });
  
  
  
//     return socket;
// };
