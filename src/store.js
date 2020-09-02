import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './Redux/Reducers/rootReducer';

const composeEnhancers =
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
				{
					// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
				}
			)
		: compose;

const persistConfig = {
	key: 'root',
	storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(reduxThunk)));
export const persistor = persistStore(store);
