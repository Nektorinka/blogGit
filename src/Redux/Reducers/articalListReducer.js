const initialState = {
	articlesState: [],
	isLoading: true,
	isError: false
};

function articalListReducer(state = initialState, action) {
	switch (action.type) {
		case 'LOAD_ARTICLES':
			return {
				articlesState: action.payload,
				isLoading: false,
				isError: false
			};
		case 'SET_ERROR':
			return {
				articlesState: [],
				isLoading: false,
				isError: true
			};
		case 'SET_LOAD':
			return { ...state, isLoading: true };
		default:
			return state;
	}
}

export default articalListReducer;
