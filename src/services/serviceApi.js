export default class ServiceApi {
	constructor() {
		this.base = 'https://conduit.productionready.io/api/';
		// this.token = JSON.parse(localStorage.userInfo).user.token;
	}

	async getArticles() {
		try {
			const response = await fetch(this.base + 'articles');
			return await response.json();
		} catch (error) {
			const response = await fetch(this.base + 'articles');
			return await response.json();
		}
	}
	async getAutArticles(token) {
		try {
			const response = await fetch(this.base + 'articles', {
				'Content-Type': 'application/json',
				Authorization: `Token ${JSON.parse(localStorage.userInfo).user.token}`
			});
			return await response.json();
		} catch (error) {
			const response = await fetch(this.base + 'articles', {
				'Content-Type': 'application/json',
				Authorization: `Token ${JSON.parse(localStorage.userInfo).user.token}`
			});
			return await response.json();
		}
	}

	async getFullArticle(slug) {
		try {
			let response = await fetch(this.base + `articles/${slug}`);
			return await response.json();
		} catch (error) {
			let response = await fetch(this.base + `articles/${slug}`);
			return await response.json();
		}
	}
	async signUp(body) {
		const headers = {
			'Content-Type': 'application/json'
		};
		return fetch(`https://conduit.productionready.io/api/users`, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: headers
		}).then((response) => {
			return response.json();
		});
	}

	async sigIn(body) {
		const headers = {
			'Content-Type': 'application/json'
		};
		return fetch(`https://conduit.productionready.io/api/users/login`, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: headers
		}).then((response) => {
			return response.json();
		});
	}
	async setLike(slug, token) {
		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`
		};
		try {
			return fetch(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {
				method: 'POST',
				headers: headers
			}).then((response) => {
				return response.json();
			});
		} catch (error) {
			return fetch(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {
				method: 'POST',
				headers: headers
			}).then((response) => {
				return response.json();
			});
		}
	}
	async unsetLike(slug, token) {
		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`
		};
		try {
			return fetch(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {
				method: 'DELETE',
				headers: headers
			}).then((response) => {
				return response.json();
			});
		} catch (error) {
			return fetch(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {
				method: 'DELETE',
				headers: headers
			}).then((response) => {
				return response.json();
			});
		}
	}
	async updateUser(data, token) {
		const { email, url, username, password } = data;
		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`
		};
		const body = {
			user: {
				email: email,
				image: url,
				username: username,
				password: password
			}
		};
		try {
			return fetch(`https://conduit.productionready.io/api/user`, {
				method: 'PUT',
				headers: headers,
				body: JSON.stringify(body)
			}).then((response) => {
				console.log(response);
				if (response.ok) {
					return response.json();
				}
			});
		} catch (error) {
			return fetch(`https://conduit.productionready.io/api/user`, {
				method: 'PUT',
				headers: headers,
				body: JSON.stringify(body)
			}).then((response) => {
				if (response.ok) {
					return response.json();
				}
			});
		}
	}
}
