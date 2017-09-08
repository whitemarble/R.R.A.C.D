import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import promise from 'redux-promise';
import myApp from './reducers';

import App from './App';


let store = createStore(myApp, applyMiddleware(promise));


ReactDOM.render(
    <Provider store={store}>   
        <App />
    </Provider>
    , 
    document.getElementById('root')
);



console.log(store.getState());