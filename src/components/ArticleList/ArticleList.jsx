import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Pagination, Spin, Alert } from 'antd';
import 'antd/dist/antd.css';
import { LoadingOutlined } from '@ant-design/icons';
import './articleList.scss';
import Article from '../Article/Article';
import * as actions from '../../Redux/Actions/actions';

function renderArticles(list) {
	return list.map((article) => {
		return <Article data={article} />;
	});
}

function ArticleList({ articleList, loadArticles }) {
	useEffect(() => {
		loadArticles();
	}, []);

	const { articles } = articleList.articlesState;

	if (articles) {
		return (
			<div className="articles">
				{renderArticles(articles)}
				<div className="paginator">
					<Pagination size="small" total={50} />
				</div>
			</div>
		);
	}

	if (articleList.isLoading) {
		const antIcon = <LoadingOutlined style={{ fontSize: 56 }} spin />;
		return (
			<div className="articles">
				<Spin indicator={antIcon} />
				{articles ? renderArticles(articles) : null}
				<div className="paginator">
					<Pagination size="small" total={50} />
				</div>
			</div>
		);
	}

	if (articleList.isError) {
		return (
			<div className="articles">
				<Alert message="Произошла ошибка. Обновите страницу" type="error" />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		articleList: state.articalListReducer
	};
};

export default connect(mapStateToProps, actions)(ArticleList);
