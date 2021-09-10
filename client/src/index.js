import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import {Provider} from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers/index'

// redux가 promise 나 function으로 받을때, 조치를 취해주기 위해 
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk )(createStore)

ReactDOM.render(
  <React.StrictMode>
    <Provider
    // 리덕스 개발자 도구를 쓸수 있게 해준다.
      store={createStoreWithMiddleware(Reducer, 
        window.__REDUX_DEVTOOLS_EXTENSION__&&
        window.__REDUX_DEVTOOLS_EXTENSION__()       
        )}
    >
      <App />
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
