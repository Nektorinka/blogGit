import { myService } from '../../services/serviceApi';

export function setArticlesInStore(payload) {
	return {
		type: 'LOAD_ARTICLES',
		payload
	};
}
export function setLoad() {
	return {
		type: 'SET_LOAD'
	};
}
export function setUnLoad() {
	return {
		type: 'SET_UNLOAD'
	};
}

export function setError() {
	return {
		type: 'SET_ERROR'
	};
}

export function loadArticles(page, token = null) {
	return async function cb(dispatch) {
		try {
			dispatch(setLoad());
			const response = await myService.getAutArticles(page, token);
			const res = await dispatch(setArticlesInStore(response));
			return res;
		} catch (error) {
			dispatch(setLoad());
			const response = await myService.getAutArticles(page, token);
			const res = await dispatch(setArticlesInStore(response));
			return res;
		}
	};
}

export function setUserInfo(payload) {
	return {
		type: 'SIGN_UP',
		payload
	};
}

export function logIn(payload) {
	return {
		type: 'LOG_IN',
		payload
	};
}
export function setErrorInMain(payload) {
	return {
		type: 'SET_ERROR_IN_MAIN',
		payload
	};
}
export function logOut() {
	return {
		type: 'LOG_OUT'
	};
}
