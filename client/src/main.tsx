/*
 This code sets up a TypeScript React application using Redux Toolkit and Redux
 Toolkit Query.
 */

import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import App from '@/App';
import '@/index.css';
import {stockApi} from "@/state/yahooAPI";

// Create Redux store with middleware
export const store = configureStore({
  reducer: { [stockApi.reducerPath]: stockApi.reducer },
  middleware: (getDefault) => getDefault().concat(stockApi.middleware),
})

// Set up listeners for Redux store
setupListeners(store.dispatch)

// Render the main application
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App/>
  </Provider>,
)
