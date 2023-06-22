import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

if (!localStorage.getItem('countBuy')){
  localStorage.setItem('countBuy',0)
}
if (!localStorage.getItem('countWish')){
  localStorage.setItem('countWish',0)
}

//wishList basketList

if (!localStorage.getItem('wishList')){
  localStorage.setItem('wishList', JSON.stringify([]))
}
if (!localStorage.getItem('basketList')){
  localStorage.setItem('basketList', JSON.stringify([]))
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
