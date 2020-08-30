import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FullArticle from '../Article/FullArticle';
import Header from '../Header/Header';
import ArticleList from '../ArticleList/ArticleList';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignUp/SignIn';
import EditProfile from '../SignUp/EditProfile';
import CreateeNewArticle from '../SignUp/CeateNewArticle';

function App(props) {
	return (
		<React.Fragment>
			<Router>
				<Header />
				<Route path="/" component={ArticleList} exact />
				<Route path="/articles" component={ArticleList} exact />
				<Route
					path="/articles/:slug"
					render={({ match }) => {
						const slug = match.params;
						return <FullArticle slug={slug} />;
					}}
				/>
				<Route path="/sign-up" component={SignUp} />
				<Route path="/sign-in" component={SignIn} />
				<Route path="/edit-profile" component={EditProfile} />
				<Route path="/create-new-article" component={CreateeNewArticle} />
			</Router>
		</React.Fragment>
	);
}

export default App;
