// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'


import { Provider } from "react-redux";
import { store } from "./redux/app/store";
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n';

ReactDOM.createRoot(document.getElementById("root")).render(
  <Suspense>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>
);
