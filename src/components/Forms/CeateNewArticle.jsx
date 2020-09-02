import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Redirect, withRouter } from 'react-router-dom';
import './signUp.scss';
import { renderTags } from './formsFunctions';
import * as actions from '../../Redux/Actions/actions';
import ServiceApi from '../../services/serviceApi';

function CreateNewArticle({ mainState, history }) {
	const [ tagsState, setTag ] = useState([]);

	const { register, handleSubmit, errors } = useForm();

	const { isLogged } = mainState;

	const myService = new ServiceApi();
	const onSubmit = (data) => {
		const { token } = mainState.loggedInfo.user;
		data.tags = tagsState;
		myService.createArticle(token, data).then((res) => history.push('/'));
	};

	const inputRef = React.createRef();

	if (!isLogged) {
		return <Redirect to="/sign-in" />;
	}
	return (
		<div className="new-article  ">
			<form onSubmit={handleSubmit(onSubmit)} className="sign_up_form form">
				<div className="form__header-container">
					<h1 className="form__header">Create new article</h1>
				</div>
				<label className="form__input-group">
					<span className={`form__input-label' + ${errors.title ? ' form__input-label--error' : null}`}>
						Title
					</span>
					<input
						type="text"
						name="title"
						placeholder="title"
						className={`form__input ${errors.title ? ' form__input--error' : null}`}
						ref={register({
							required: 'Заполните поле',
							maxLength: { value: 100, message: 'Заголовок должен быть менее 100 символов' }
						})}
					/>
					{errors.title && (
						<span className="form__input-label form__input-label--error">{errors.title.message}</span>
					)}
				</label>
				<label className="form__input-group">
					<span
						className={`form__input-label' + ${errors.shortDescription
							? ' form__input-label--error'
							: null}`}
					>
						Short description
					</span>
					<input
						type="text"
						name="shortDescription"
						placeholder="title"
						className={`form__input ${errors.shortDescription ? ' form__input--error' : null}`}
						ref={register({
							required: 'Заполните поле',
							maxLength: { value: 400, message: 'Описание должно быть менее 400 символов' }
						})}
					/>
					{errors.shortDescription && (
						<span className="form__input-label form__input-label--error">
							{errors.shortDescription.message}
						</span>
					)}
				</label>
				<label className="form__input-group">
					<span className={`form__input-label' + ${errors.text ? ' form__input-label--error' : null}`}>
						Text
					</span>
					<textarea
						type="text"
						name="text"
						placeholder="text"
						className={`form__input form__text-area ${errors.text ? ' form__input--error' : null}`}
						rows="6"
						ref={register({
							required: 'Заполните поле',
							maxLength: { value: 800, message: 'Статья должна быть менее 800 символов' }
						})}
					/>
					{errors.text && (
						<span className="form__input-label form__input-label--error">{errors.text.message}</span>
					)}
				</label>
				<div className="form__tags">
					{renderTags(tagsState, { tagsState, setTag })}
					<div className="form__tag">
						<input
							type="text"
							name="addTag"
							id="addTag"
							className="form__input"
							placeholder="Tag"
							ref={inputRef}
						/>
						<button type="button" className="form__delet-tag-btn mg-right--15px" onClick={() => setTag([])}>
							Delete
						</button>
						<button
							type="button"
							className="form__add-tag-btn "
							onClick={() => {
								if (inputRef.current.value !== '') {
									setTag([ ...tagsState, inputRef.current.value ]);
									inputRef.current.value = '';
								}
							}}
						>
							Add tag
						</button>
					</div>
				</div>

				<button type="submit" className="form__submit new-article__send-btn mg-top--10px mg-bottom--40px">
					Send
				</button>
			</form>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		mainState: state.mainReducer
	};
};

export default withRouter(connect(mapStateToProps, actions)(CreateNewArticle));
