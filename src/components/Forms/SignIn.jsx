import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './signUp.scss';
import { Alert } from 'antd';
import * as actions from '../../Redux/Actions/actions';
import { myService } from '../../services/serviceApi';
import { renderErrors } from './formsFunctions';

function SignIn({ logIn, setErrorInMain, mainState, history }) {
	const [ sucsessLog, setSucsessLog ] = useState(false);

	const { register, handleSubmit, errors } = useForm();
	async function onSubmit(data) {
		try {
			const response = await myService.sigIn({
				user: {
					email: data.email,
					password: data.password
				}
			});
			if (response.errors) {
				return setErrorInMain(response.errors);
			} else {
				logIn(response);
				setSucsessLog(true);

				return setTimeout(() => {
					history.push('/');
				}, 1500);
			}
		} catch (err) {
			const response = await myService.sigIn({
				user: {
					email: data.email,
					password: data.password
				}
			});
			if (response.errors) {
				return setErrorInMain(response.errors);
			} else {
				logIn(response);
				setSucsessLog(true);
				return setTimeout(() => {
					history.push('/');
				}, 1500);
			}
		}
	}

	return (
		<div className="sign_up">
			<form onSubmit={handleSubmit(onSubmit)} className="sign_up_form form">
				<div className="form__header-container">
					<h1 className="form__header">Sign In</h1>
				</div>
				<label className="form__input-group">
					<span className="form__input-label">Email address</span>
					<input
						autoFocus
						type="email"
						name="email"
						placeholder="Email address"
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
					<span className="form__input-label">Password</span>
					<input
						type="password"
						name="password"
						placeholder="Password"
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

				<button type="submit" className="form__submit">
					Login
				</button>
				<div className="form__container">
					<span className="form__text">
						Don't have an account?{' '}
						<Link className="form__link" to="/sign-up">
							Sign In.
						</Link>
					</span>
				</div>
				{sucsessLog ? <Alert message="Success" type="success" style={{ marginBottom: '20px' }} /> : null}
				{mainState.error ? renderErrors(mainState.error) : null}
			</form>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		mainState: state.mainReducer
	};
};

const { logIn, setErrorInMain } = actions;

export default withRouter(connect(mapStateToProps, { logIn, setErrorInMain })(SignIn));
