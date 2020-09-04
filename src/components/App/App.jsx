import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FullArticle from '../Article/FullArticle';
import Header from '../Header/Header';
import ArticleList from '../ArticleList/ArticleList';
import SignUp from '../Forms/SignUp';
import SignIn from '../Forms/SignIn';
import EditProfile from '../Forms/EditProfile';
import EditeArticle from '../Forms/EditeArticle';
import CreateNewArticle from '../Forms/CeateNewArticle';

function App() {
	return (
		<React.Fragment>
			<Router>
				<Header />
				<Route path="/" component={ArticleList} exact />
				<Route
					path="/articles"
					render={() => {
						return <ArticleList />;
					}}
					exact
				/>
				<Route
					exact
					path="/articles/:slug"
					render={({ match }) => {
						const slug = match.params;
						return <FullArticle slug={slug} />;
					}}
				/>
				<Route
					path="/articles/:slug/edit"
					render={({ match }) => {
						const slug = match.params;
						return <EditeArticle slug={slug} />;
					}}
				/>
				<Route path="/sign-up" component={SignUp} />
				<Route path="/sign-in" component={SignIn} />
				<Route path="/edit-profile" component={EditProfile} />
				<Route exact path="/create-new-article" component={CreateNewArticle} />
			</Router>
		</React.Fragment>
	);
}

export default App;
