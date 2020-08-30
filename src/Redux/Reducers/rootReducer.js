import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import articalListReducer from './articalListReducer';
import mainReducer from './mainReducer';

const rootReducer = combineReducers({ articalListReducer, mainReducer });

// const persistConfig = {
// 	key: 'root',
// 	storage,
// 	whitelist: [ 'articalListReducer', 'mainReducer' ]
// };

export default rootReducer;
