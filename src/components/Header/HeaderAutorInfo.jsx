import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../../Redux/Actions/actions';
import './header.scss';

const { setPersist } = actions;

function HeaderInfoSwitch({ mainState, logOut, history }) {
	const { isLogged, loggedInfo } = mainState;
	if (isLogged && mainState.loggedInfo) {
		const { username, image } = mainState.loggedInfo.user;

		const defaultImgae = 'https://static.productionready.io/images/smiley-cyrus.jpg';
		return (
			<div
				className="article__author-block header__autor"
				onClick={() => {
					setPersist('lock');
					history.push('/edit-profile');
				}}
			>
				<Link to="/create-new-article" className="header-button--create-article">
					Create article
				</Link>
				<div className="article__author-description">
					<h3 className="article__autor">{username}</h3>
				</div>
				<div clclassNames="article__author-avatar">
					<img src={image ? image : defaultImgae} alt="author-avatar" className="article__image" />
				</div>
				<Link
					to="/create-new-article"
					className="header-button--logout "
					onClick={() => {
						logOut();
						setTimeout(() => {
							history.push('/');
						}, 1500);
					}}
				>
					Log Out
				</Link>
			</div>
		);
	} else {
		return (
			<React.Fragment>
				<Link to="/sign-in" className="header-button--sign-in header__button">
					Sign In
				</Link>
				<Link to="/sign-up" className="header-button--sign-up header__button">
					Sign Up
				</Link>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		mainState: state.mainReducer
	};
};

export default withRouter(connect(mapStateToProps, actions)(HeaderInfoSwitch));
