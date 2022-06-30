import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "../node_modules/swiper/swiper-bundle.esm.js"
import storeConfig from './config/store.config';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Container from './components/Container';
// import * as serviceWorker from './serviceWorker';

const store = storeConfig()
ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
    <Container />
  </Provider>
  </BrowserRouter>,

document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// serviceWorker.unregister();
