import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducer';
import featureReducer from './featureReducer';

const rootReducer = combineReducers({
    form,
    auth: authReducer,
    feature: featureReducer
});

export default rootReducer;
