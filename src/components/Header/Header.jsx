import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './header.scss';
import * as actions from '../../Redux/Actions/actions';
import HeaderInfoSwitch from './HeaderAutorInfo';

function Header({ mainState }) {
	const { isLogged, loggedInfo } = mainState;
	console.log(mainState, localStorage['userInfo']);
	return (
		<div className="header">
			<Link to="/" className="header__logo">
				Realworld Blog
			</Link>
			<div className="header__buttons">
				<HeaderInfoSwitch />
			</div>
		</div>
	);
}
const mapStateToProps = (state) => {
	return {
		mainState: state.mainReducer
	};
};

export default connect(mapStateToProps, actions)(Header);
