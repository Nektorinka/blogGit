import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Pagination, Spin } from 'antd';
import 'antd/dist/antd.css';
import { LoadingOutlined } from '@ant-design/icons';
import './articleList.scss';
import Article from '../Article/Article';
import * as actions from '../../Redux/Actions/actions';

function renderArticles(list) {
	if (list) {
		return list.map((article) => {
			return <Article key={article.slug} data={article} />;
		});
	}
	return null;
}

function ArticleList({ articleList, loadArticles, mainState }) {
	const [ page, setPage ] = useState(1);
	useEffect(
		() => {
			if (mainState.isLogged) {
				const token = mainState.loggedInfo.user.token;
				loadArticles(page, token);
			} else {
				loadArticles(page);
			}
		},
		[ page ]
	);

	const { articles } = articleList.articlesState;

	function onChange(pageNumber) {
		setPage(pageNumber);
	}

	if (!articleList.isLoading) {
		return (
			<div className="articles">
				{renderArticles(articles)}
				<div className="paginator">
					<Pagination size="small" total={500} onChange={onChange} showSizeChanger={false} />
				</div>
			</div>
		);
	} else {
		const antIcon = <LoadingOutlined style={{ fontSize: 56 }} spin />;
		return (
			<div className="articles">
				<Spin indicator={antIcon} />
				<div className="paginator">
					<Pagination size="small" total={500} showSizeChanger={false} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		articleList: state.articalListReducer,
		mainState: state.mainReducer
	};
};
const { loadArticles } = actions;
export default connect(mapStateToProps, { loadArticles })(ArticleList);
