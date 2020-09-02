import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import './article.scss';
import { renderTags, renderDate } from './articleFunctions';
import { HeartOutlined } from '@ant-design/icons';
import ServiceApi from '../../services/serviceApi';
import * as actions from '../../Redux/Actions/actions';

function Article({ mainState, data, history }) {
	const [ dataState, setData ] = useState(data);
	const { username, image } = dataState.author;
	const { createdAt, title, tagList, description, slug, favoritesCount, favorited } = dataState;
	let token = null;
	if (mainState.loggedInfo) {
		token = mainState.loggedInfo.user.token;
	}
	const { isLogged } = mainState;

	const myService = new ServiceApi();
	return (
		<div className="article">
			<div className="article__content">
				<div className="article__header">
					<Link to={`/articles/${slug}`} className="article__title">
						{title}
					</Link>
					<div className={`article__like article__${favorited ? 'like--active' : null} `}>
						<HeartOutlined
							onClick={() => {
								if (isLogged) {
									if (!favorited) {
										myService.setLike(slug, token).then((response) => setData(response.article));
									} else {
										myService.unsetLike(slug, token).then((response) => setData(response.article));
									}
								} else {
									history.push('/sign-in');
								}
							}}
						/>
						<span className="article__like-counter">{favoritesCount}</span>
					</div>
				</div>
				<div className="article__tags">{renderTags(tagList)}</div>
				<div className="article__article">{description}</div>
			</div>
			<div className="article__author-block">
				<div className="article__author-description">
					<h3 className="article__autor">{username}</h3>
					<h4 className="article__date">{renderDate(createdAt)} </h4>
				</div>
				<div className="article__author-avatar">
					<img src={image} alt="author-avatar" className="article__image" />
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		mainState: state.mainReducer
	};
};

export default withRouter(connect(mapStateToProps, actions)(Article));
