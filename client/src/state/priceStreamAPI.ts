type WebSocketDataCallback = (data: unknown) => void;

export const connectToWebSocket = (symbol: string, onDataReceived: WebSocketDataCallback): WebSocket => {
  const socket = new WebSocket('wss://ws.finnhub.io?token=cmjgslhr01qo8idm263gcmjgslhr01qo8idm2640');

  socket.addEventListener('open', (_event) => {
    console.log(`WebSocket connected for ${symbol}`);
    socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': symbol.toUpperCase() }));
  });

  socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    onDataReceived(data);
  });

  socket.addEventListener('close', (event) => {
    console.log('WebSocket connection closed:', event);
  });

  socket.addEventListener('error', (error) => {
    console.error('WebSocket error:', error);
  });

  return socket;
};


// EOD Example
// type WebSocketDataCallback = (data: unknown) => void;

// export const connectToWebSocket = (symbol: string, onDataReceived: WebSocketDataCallback): WebSocket => {
//     const socket = new WebSocket('wss://ws.eodhistoricaldata.com/ws/crypto?api_token=demo');
  
//     socket.onopen = () => {
//       console.log(`WebSocket connected for ${symbol}`);
//       socket.send(JSON.stringify({ 'action': 'subscribe', 'symbols': `${symbol}`}));
//     };
  
//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       onDataReceived(data);
//     };
  
//     socket.onclose = (event) => {
//       console.log('WebSocket connection closed:', event);
//     };
  
//     socket.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };
  
//     return socket;
//   };
