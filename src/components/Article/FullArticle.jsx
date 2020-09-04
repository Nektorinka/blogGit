import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './article.scss';
import { HeartOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import Markdown from 'markdown-to-jsx';
import { renderTags, renderDate } from './articleFunctions';
import { myService } from '../../services/serviceApi';

function FulllArticle({ slug, history, mainState }) {
	const [ data, setData ] = useState([]);
	useEffect(
		() => {
			if (isLogged) {
				myService.getFullArticle(slug.slug, mainState.loggedInfo.user.token).then((res) => {
					return setData(res);
				});
			} else {
				myService.getFullArticle(slug.slug).then((res) => {
					return setData(res);
				});
			}
		},
		[ mainState ]
	);

	const { isLogged } = mainState;

	const text = 'Are you sure to delete this article?';

	function confirm() {
		myService.deleteArticle(mainState.loggedInfo.user.token, slug.slug).then((res) => history.push('/'));
	}
	if (data.article) {
		return (
			<div className="article-container">
				<div className="article__full">
					<div className="article__content">
						<div className="article__header">
							<h2 className="article__title">{data.article.title}</h2>
							<div className={`article__like ${data.article.favorited ? `article__like--active` : ``} `}>
								<HeartOutlined
									onClick={() => {
										if (isLogged) {
											if (!data.article.favorited) {
												myService
													.setLike(slug.slug, mainState.loggedInfo.user.token)
													.then((response) => setData(response));
											} else {
												myService
													.unsetLike(slug.slug, mainState.loggedInfo.user.token)
													.then((response) => setData(response));
											}
										} else {
											history.push('/sign-in');
										}
									}}
								/>
								<span className="article__like-counter">{data.article.favoritesCount}</span>
							</div>
						</div>
						<div className="article__tags">{renderTags(data.article.tagList)}</div>
						<div className="article__article-full">{data.article.description}</div>
					</div>
					<div className="article__author-block">
						<div className="article__author-description">
							<h3 className="article__autor">{data.article.author.username}</h3>
							<h4 className="article__date">{renderDate(data.article.createdAt)} </h4>
							<div className="article__btns">
								<Popconfirm
									placement="right"
									title={text}
									onConfirm={confirm}
									okText="Yes"
									cancelText="No"
								>
									<button
										type="button"
										className={`article__delete-btn ${!isLogged ||
										mainState.loggedInfo.user.username !== data.article.author.username
											? `article__delete-btn--disable`
											: null}`}
									>
										Delete
									</button>
								</Popconfirm>
								<button
									type="button"
									className={`article__edit-btn ${!isLogged ||
									mainState.loggedInfo.user.username !== data.article.author.username
										? `article__edit-btn--disable`
										: null}`}
									onClick={() => {
										history.push(`/articles/${slug.slug}/edit`);
									}}
								>
									Edit
								</button>
							</div>
						</div>
						<div clclassNames="article__author-avatar">
							<img src={data.article.author.image} alt="author-avatar" className="article__image" />
						</div>
					</div>
				</div>
				<div className="article__body">
					<Markdown>{data.article.body}</Markdown>
				</div>
			</div>
		);
	}

	return null;
}

const mapStateToProps = (state) => {
	return {
		mainState: state.mainReducer
	};
};

export default withRouter(connect(mapStateToProps)(FulllArticle));
