import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './header.scss';
import HeaderInfoSwitch from './HeaderAutorInfo';

function Header({ mainState }) {
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

export default connect(mapStateToProps)(Header);
