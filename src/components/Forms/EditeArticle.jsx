import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './signUp.scss';
import { myService } from '../../services/serviceApi';
import NewArticleForm from './NewArticleForm';

function EditeArticle({ mainState, history, slug }) {
	const [ tagsState, setTag ] = useState([]);
	const [ data, setData ] = useState({});
	useEffect(
		() => {
			myService.getFullArticle(slug.slug).then((res) => {
				setData(res);
				setTag(res.article.tagList);
			});
		},
		[ slug.slug ]
	);

	const { isLogged } = mainState;
	const { token } = mainState.loggedInfo.user;

	const onSubmit = (data) => {
		data.tags = tagsState;
		myService.editArticle(token, slug.slug, data).then((res) => {
			if (res.errors) {
				alert(res.errors.body[0]);
			}
			history.push('/');
		});
	};

	if (!isLogged) {
		return <Redirect to="/sign-in" />;
	}
	if (data.article) {
		let { body, description, title } = data.article;

		return (
			<NewArticleForm
				mainState={mainState}
				history={history}
				tagsState={tagsState}
				setTag={setTag}
				data={data}
				onSubmit={onSubmit}
				body={body}
				description={description}
				title={title}
			/>
		);
	}

	const antIcon = <LoadingOutlined style={{ fontSize: 62 }} spin />;
	return (
		<div className="form__spin">
			<Spin indicator={antIcon} />
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		mainState: state.mainReducer
	};
};

export default withRouter(connect(mapStateToProps)(EditeArticle));
