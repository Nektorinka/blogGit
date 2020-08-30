import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import './article.scss';
import ServiceApi from '../../services/serviceApi';
import { renderTags, renderDate } from './articleFunctions';
import { HeartOutlined } from '@ant-design/icons';
import Markdown from 'markdown-to-jsx';

function FulllArticle({ slug, history }) {
	const [ data, setData ] = useState([]);
	const myService = new ServiceApi();
	useEffect(() => {
		myService.getFullArticle(slug.slug).then((res) => {
			return setData(res);
		});
	}, []);

	console.log(slug);
	if (data.article) {
		return (
			<div className="article-container">
				<div className="article__full">
					<div className="article__content">
						<div className="article__header">
							<h2 className="article__title">{data.article.title}</h2>
							<div
								className={`article__like article__${data.article.favorited ? 'like--active' : null} `}
							>
								<HeartOutlined
									onClick={() => {
										if (localStorage.userInfo) {
											if (!data.article.favorited) {
												myService
													.setLike(slug.slug, JSON.parse(localStorage.userInfo).user.token)
													.then((response) => setData(response));
											} else {
												myService
													.unsetLike(slug.slug, JSON.parse(localStorage.userInfo).user.token)
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

export default withRouter(FulllArticle);
