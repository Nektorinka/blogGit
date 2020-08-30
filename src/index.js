import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import './index.css';
import './index.scss';
import App from './components/App/App';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

const app = (
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));
