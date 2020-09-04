import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import './signUp.scss';
import { myService } from '../../services/serviceApi';
import * as actions from '../../Redux/Actions/actions';

function EditProfile({ mainState, logIn }) {
	const { register, handleSubmit, errors } = useForm();

	if (!mainState.isLogged) {
		return <Redirect to="/" />;
	}

	const { token, email, username } = mainState.loggedInfo.user;

	const onSubmit = (data) => {
		myService.updateUser(data, token).then((res) => {
			logIn(res);
		});
	};

	return (
		<div className="sign_up">
			<form onSubmit={handleSubmit(onSubmit)} className="sign_up_form form">
				<div className="form__header-container">
					<h1 className="form__header">Edit Profile</h1>
				</div>
				<label className="form__input-group">
					<span className={`form__input-label' + ${errors.username ? ' form__input-label--error' : null}`}>
						Username
					</span>
					<input
						type="text"
						defaultValue={username}
						name="username"
						placeholder="DefaultUsername"
						className={`form__input ${errors.username ? ' form__input--error' : null}`}
						ref={register({
							required: 'Введите логин',
							minLength: { value: 3, message: 'Логин должен быть от 3 до 20 символов' },
							maxLength: { value: 20, message: 'Логин должен быть от 3 до 20 символов' }
						})}
					/>
					{errors.username && (
						<span className="form__input-label form__input-label--error">{errors.username.message}</span>
					)}
				</label>
				<label className="form__input-group">
					<span className="form__input-label">Email address</span>
					<input
						defaultValue={email}
						type="email"
						name="email"
						placeholder="Default@value.com"
						className="form__input"
						ref={register({
							required: 'Введите email',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'Введите корректный email'
							}
						})}
					/>
					{errors.email && (
						<span className="form__input-label form__input-label--error">{errors.email.message}</span>
					)}
				</label>
				<label className="form__input-group">
					<span className="form__input-label">New password</span>
					<input
						type="password"
						name="password"
						placeholder="New password"
						className="form__input"
						ref={register({
							required: 'Введите пароль',
							minLength: { value: 6, message: 'Пароль должен быть от 6 до 40 символов' },
							maxLength: { value: 40, message: 'Пароль должен быть от 6 до 40 символов' }
						})}
					/>
					{errors.password && (
						<span className="form__input-label form__input-label--error">{errors.password.message}</span>
					)}
				</label>
				<label className="form__input-group">
					<span className="form__input-label">Avatar image (url)</span>
					<input
						type="url"
						name="url"
						placeholder="Avatar image"
						className="form__input"
						ref={register({
							required: 'Введите ссылку'
						})}
					/>
					{errors.url && (
						<span className="form__input-label form__input-label--error">{errors.url.message}</span>
					)}
				</label>

				<button type="submit" className="form__submit mg-top--10px mg-bottom--40px">
					Save
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

const { logIn } = actions;
export default connect(mapStateToProps, { logIn })(EditProfile);
