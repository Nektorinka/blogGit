import { combineReducers } from 'redux';
import articalListReducer from './articalListReducer';
import mainReducer from './mainReducer';

const rootReducer = combineReducers({ articalListReducer, mainReducer });

export default rootReducer;
