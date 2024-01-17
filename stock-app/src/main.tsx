import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import {Provider} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {stockApi} from "@/state/yahooAPI";

export const store = configureStore({
  reducer: { [stockApi.reducerPath]: stockApi.reducer },
  middleware: (getDefault) => getDefault().concat(stockApi.middleware),
})
setupListeners(store.dispatch)


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App className="custom-scrollbar"/>
  </Provider>,
)
