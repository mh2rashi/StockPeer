/**
 * The `connectToWebSocket` function connects to a WebSocket server, subscribes to symbol updates, and
 * passes received data to a callback function.
 * @param {string} symbol - The symbol parameter is a string that represents the symbol or ticker of
 * the financial instrument you want to subscribe to updates for. For example, if you want to subscribe
 * to updates for Apple Inc., the symbol would be "AAPL".
 * @param {WebSocketDataCallback} onDataReceived - The `onDataReceived` parameter is a callback
 * function that will be called whenever data is received from the WebSocket. It takes one parameter
 * `data` of type `unknown`, which represents the received data from the WebSocket. You can define this
 * callback function to handle the received data in any way you need
 * @returns The function `connectToWebSocket` returns a WebSocket instance.
 **/


// Define a type for the callback function to handle WebSocket data
type WebSocketDataCallback = (data: unknown) => void;

// Function to connect to WebSocket with symbol and data callback
export const connectToWebSocket = (symbol: string, onDataReceived: WebSocketDataCallback): WebSocket => {
  // Create a new WebSocket instance with the provided URL
  const socket = new WebSocket('wss://ws.finnhub.io?token=' + `${import.meta.env.API_TOKEN}`);

  // Event listener for when the WebSocket connection is opened
  socket.addEventListener('open', (_event) => {
    console.log(`WebSocket connected for ${symbol}`);
    // Subscribe to symbol updates after connection is established
    socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': symbol.toUpperCase() }));
  });

  // Event listener for when a message is received from the WebSocket
  socket.addEventListener('message', (event) => {
    // Parse the received data and pass it to the provided callback function
    const data = JSON.parse(event.data);
    onDataReceived(data);
  });

  // Event listener for when the WebSocket connection is closed
  socket.addEventListener('close', (event) => {
    console.log('WebSocket connection closed:', event);
  });

  // Event listener for WebSocket errors
  socket.addEventListener('error', (error) => {
    console.error('WebSocket error:', error);
  });

  // Return the WebSocket instance
  return socket;
};
