import React from 'react';
import { Alert } from 'antd';

export const renderErrors = (errors = {}) => {
	const res = Object.keys(errors).map((el) => (
		<Alert message={`${el}: ${errors[el]}`} type="error" style={{ marginBottom: '10px' }} />
	));
	return res;
};

export const renderTags = (tagsArray = [], { ...cb }) => {
	const { tagsState, setTag } = cb;
	return tagsArray.map((tag, index) => {
		return (
			<div className="form__tag">
				<input type="text" className="form__input" placeholder="Tag" value={tag} />
				<button
					type="button"
					className="form__delet-tag-btn mg-right--15px"
					onClick={() => {
						const newState = [ ...tagsState ];
						return setTag(newState.filter((el) => el !== newState[index]));
					}}
				>
					Delete
				</button>
			</div>
		);
	});
};
