const initialState = {
	isLogged: false,
	userInfo: null,
	loggedInfo: null,
	error: null
};

function mainReducer(state = initialState, action) {
	switch (action.type) {
		case 'SIGN_UP':
			return {
				isLogged: false,
				userInfo: action.payload,
				error: []
			};
		case 'LOG_IN':
			return {
				isLogged: true,
				userInfo: state.userInfo,
				loggedInfo: action.payload,
				error: []
			};
		case 'LOG_OUT':
			return {
				isLogged: false,
				userInfo: [],
				loggedInfo: null,
				error: []
			};
		case 'SET_ERROR_IN_MAIN':
			return {
				isLogged: false,
				userInfo: [],
				loggedInfo: null,
				error: action.payload
			};
		default:
			return state;
	}
}

export default mainReducer;
