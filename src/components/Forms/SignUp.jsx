import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './signUp.scss';
import { Alert } from 'antd';
import * as actions from '../../Redux/Actions/actions';
import { myService } from '../../services/serviceApi';
import { renderErrors } from './formsFunctions';

function SignUp({ setUserInfo, setErrorInMain, mainState }) {
	const [ redirect, setredirect ] = useState(false);
	const [ sucsessReg, setSucsessReg ] = useState(false);

	const { register, handleSubmit, errors, watch } = useForm();
	async function onSubmit(data) {
		try {
			const response = await myService.signUp({
				user: {
					username: data.username,
					email: data.email,
					password: data.password
				}
			});
			if (response.errors) {
				return setErrorInMain(response.errors);
			} else {
				setUserInfo(response);
				setSucsessReg(true);
				return setTimeout(() => {
					setredirect(true);
				}, 3000);
			}
		} catch (err) {
			const response = await myService.signUp({
				user: {
					username: data.username,
					email: data.email,
					password: data.password
				}
			});
			if (response.errors) {
				return setErrorInMain(response.errors);
			} else {
				setUserInfo(response);
				setSucsessReg(true);
				return setTimeout(() => {
					setredirect(true);
				}, 3000);
			}
		}
	}
	const password = watch('password');

	if (redirect) {
		return <Redirect to="/sign-in" />;
	}
	return (
		<div className="sign_up">
			<form onSubmit={handleSubmit(onSubmit)} className="sign_up_form form">
				<div className="form__header-container">
					<h1 className="form__header">Create new account</h1>
				</div>
				<label className="form__input-group">
					<span className={`form__input-label' + ${errors.username ? ' form__input-label--error' : null}`}>
						Username
					</span>
					<input
						type="text"
						name="username"
						placeholder="Username"
						className={`form__input ${errors.username ? ' form__input--error' : null}`}
						autoFocus
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
							minLength: { value: 8, message: 'Пароль должен быть от 8 до 40 символов' },
							maxLength: { value: 40, message: 'Пароль должен быть от 6 до 40 символов' }
						})}
					/>
					{errors.password && (
						<span className="form__input-label form__input-label--error">{errors.password.message}</span>
					)}
				</label>
				<label className="form__input-group">
					<span className="form__input-label">Repeat Password</span>
					<input
						type="password"
						name="repeatPasword"
						placeholder="Repeat Password"
						className="form__input"
						ref={register({
							required: 'Повторите пароль',
							validate: (value) => value === password
						})}
					/>
					{errors.repeatPasword && (
						<span className="form__input-label form__input-label--error">{'Пароль не совпадает'}</span>
					)}
				</label>
				<div className="form__divider" />
				<div className="form__policity">
					<input
						type="checkbox"
						className="form__policity-input"
						id="form__policity-label"
						name="policity"
						value="yes"
						ref={register({ required: 'Согласись' })}
					/>
					<label
						htmlFor="form__policity-label"
						className={`form__policity-label ${errors.policity ? 'form__policity-label--error' : null}`}
					>
						I agree to the processing of my personal information
					</label>
				</div>
				<button type="submit" className="form__submit">
					Create
				</button>
				<div className="form__container">
					<span className="form__text">
						Already have an account?{' '}
						<Link className="form__link" to="/sign-in">
							Sign In.
						</Link>
					</span>
				</div>
				{sucsessReg ? (
					<Alert message="Success Registration" type="success" style={{ marginBottom: '20px' }} />
				) : null}
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

const { setUserInfo, setErrorInMain } = actions;
export default connect(mapStateToProps, { setUserInfo, setErrorInMain })(SignUp);
