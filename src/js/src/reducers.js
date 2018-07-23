import { combineReducers } from 'redux';

import uiReducer from './reducers.ui';
import dataReducer from './reducers.data';

export default combineReducers({
    ui: uiReducer,
    data: dataReducer,
});
