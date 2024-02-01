import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {router} from './components/router/Router'

import {
  RouterProvider,
} from "react-router-dom";

/*const router = createBrowserRouter([
    {
      path: "/",
      element:  <App />,
    },
    {
      path: "creation-compte-restaurateur",
      element:  <h1>Accueil hfhfjfjfjf</h1>,
    },
]);*/


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();