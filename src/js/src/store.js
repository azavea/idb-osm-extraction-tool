import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const middleware = process.env.NODE_ENV === 'development' ?
    [thunk, createLogger({ diff: true, collapsed: true })] :
    [thunk];

export default applyMiddleware(...middleware)(createStore);
