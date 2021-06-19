import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Test from "./Test1";
import MapView from "./Test1";
import Map from "./Test1";
import Test2 from "./Test2";

ReactDOM.render(
  <React.StrictMode>
    {/*<App />*/}
    {/*<Map/>*/}
    {/*  <Test/>*/}
      <Test2/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
