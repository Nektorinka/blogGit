import ServiceApi from '../../services/serviceApi';

export function setArticlesInStore(payload) {
	return {
		type: 'LOAD_ARTICLES',
		payload: payload
	};
}

export function setError() {
	return {
		type: 'SET_ERROR'
	};
}
const myService = new ServiceApi();

export function loadArticles() {
	return async function cb(dispatch) {
		console.log(myService);
		try {
			if (JSON.parse(localStorage.userInfo).user.token) {
				let response = await myService.getAutArticles();
				return await dispatch(setArticlesInStore(response));
			} else {
				let response = await myService.getArticles();
				return await dispatch(setArticlesInStore(response));
			}
		} catch (error) {
			let response = await myService.getArticles();
			return await dispatch(setArticlesInStore(response));
		}
	};
}

export function setUserInfo(payload) {
	return {
		type: 'SIGN_UP',
		payload: payload
	};
}

export function logIn(payload) {
	return {
		type: 'LOG_IN',
		payload: payload
	};
}
export function setErrorInMain(payload) {
	return {
		type: 'SET_ERROR_IN_MAIN',
		payload: payload
	};
}
export function logOut() {
	return {
		type: 'LOG_OUT'
	};
}

export function setPersist(payload) {
	return {
		type: 'persist/SET_INFO',
		payload: payload
	};
}
