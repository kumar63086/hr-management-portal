import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./store/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div> Loading...</div>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
  </BrowserRouter>
);
