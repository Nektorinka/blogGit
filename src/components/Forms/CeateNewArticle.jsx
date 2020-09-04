import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Redirect, withRouter } from 'react-router-dom';
import './signUp.scss';
import { renderTags } from './formsFunctions';
import { myService } from '../../services/serviceApi';
import NewArticleForm from './NewArticleForm';

function CreateNewArticle({ mainState, history }) {
	const [ tagsState, setTag ] = useState([]);

	const { register, errors } = useForm();

	const { isLogged } = mainState;

	const onSubmit = (data) => {
		const { token } = mainState.loggedInfo.user;
		data.tags = tagsState;
		myService.createArticle(token, data).then((res) => {
			if (res.errors) {
				alert(res.errors.body[0]);
			}
			history.push('/');
		});
	};

	if (!isLogged) {
		return <Redirect to="/sign-in" />;
	}
	return (
		<NewArticleForm
			mainState={mainState}
			isLogged={isLogged}
			history={history}
			onSubmit={onSubmit}
			tagsState={tagsState}
			setTag={setTag}
			isLogged={isLogged}
			register={register}
			errors={errors}
			createArticle={true}
		/>
	);
}

const mapStateToProps = (state) => {
	return {
		mainState: state.mainReducer
	};
};

export default withRouter(connect(mapStateToProps)(CreateNewArticle));
