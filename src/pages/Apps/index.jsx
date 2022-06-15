// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
//   ,
//   document.getElementById('root')
// );

import React from 'react';
import { render } from 'react-dom';

import App from './App';
// import './index.css';

render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
  ,
  window.document.querySelector('#root')
);

if (module.hot) module.hot.accept();
