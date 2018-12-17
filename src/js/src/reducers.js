import { combineReducers } from 'redux';

import uiReducer from './reducers.ui';
import dataReducer from './reducers.data';
import geocoderReducer from './reducers.geocoder';

export default combineReducers({
    ui: uiReducer,
    data: dataReducer,
    geocoder: geocoderReducer,
});
