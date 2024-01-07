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


