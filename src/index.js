import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import counterReducer from './store/reducers/counter';
import searchHistoryReducer from './store/reducers/searchhistory';
import { Provider } from 'react-redux'

const rootReducer = combineReducers({
    ctr:counterReducer,
    shr:searchHistoryReducer
});

const store = createStore(rootReducer);
console.log(store.getState());

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
