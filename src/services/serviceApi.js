export default class ServiceApi {
	constructor() {
		this.base = 'https://conduit.productionready.io/api/';
	}

	async getArticles(page = 1) {
		const offset = page * 20 - 20;
		try {
			const response = await fetch(`https://conduit.productionready.io/api/articles?offset=${offset}`);
			return await response.json();
		} catch (error) {
			const response = await fetch(`https://conduit.productionready.io/api/articles?offset=${offset}`);
			const res = await response.json();
			return res;
		}
	}

	async getAutArticles(page = 0, token = null) {
		const offset = page * 20 - 20;
		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`
		};
		if (token !== null) {
			try {
				const response = await fetch(`https://conduit.productionready.io/api/articles?offset=${offset}`, {
					method: 'GET',
					headers
				});
				return await response.json();
			} catch (error) {
				const response = await fetch(`https://conduit.productionready.io/api/articles?offset=${offset}`, {
					method: 'GET',
					headers
				});
				const res = await response.json();
				return res;
			}
		} else {
			try {
				const response = await fetch(`https://conduit.productionready.io/api/articles?offset=${offset}`);
				return await response.json();
			} catch (error) {
				const response = await fetch(`https://conduit.productionready.io/api/articles?offset=${offset}`);
				const res = await response.json();
				return res;
			}
		}
	}

	async getFullArticle(slug, token = null) {
		if (token) {
			const headers = {
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`
			};
			try {
				const response = await fetch(`${this.base}articles/${slug}`, {
					method: 'GET',
					headers
				});
				return await response.json();
			} catch (error) {
				const response = await fetch(`${this.base}articles/${slug}`, {
					method: 'GET',
					headers
				});
				const res = await response.json();
				return res;
			}
		} else {
			try {
				const response = await fetch(`${this.base}articles/${slug}`);
				return await response.json();
			} catch (error) {
				const response = await fetch(`${this.base}articles/${slug}`);
				const res = await response.json();
				return res;
			}
		}
	}

	async signUp(body) {
		const headers = {
			'Content-Type': 'application/json'
		};
		return fetch(`https://conduit.productionready.io/api/users`, {
			method: 'POST',
			body: JSON.stringify(body),
			headers
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
			headers
		}).then((response) => {
			return response.json();
		});
	}

	async setLike(slug, token = null) {
		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`
		};
		try {
			return fetch(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {
				method: 'POST',
				headers
			}).then((response) => {
				return response.json();
			});
		} catch (error) {
			return fetch(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {
				method: 'POST',
				headers
			}).then((response) => {
				return response.json();
			});
		}
	}

	async unsetLike(slug, token = null) {
		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`
		};
		try {
			return fetch(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {
				method: 'DELETE',
				headers
			}).then((response) => {
				return response.json();
			});
		} catch (error) {
			return fetch(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {
				method: 'DELETE',
				headers
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
				email,
				image: url,
				username,
				password
			}
		};
		try {
			return fetch(`https://conduit.productionready.io/api/user`, {
				method: 'PUT',
				headers,
				body: JSON.stringify(body)
			}).then((response) => {
				if (response.ok) {
					return response.json();
				}
				return null;
			});
		} catch (error) {
			return fetch(`https://conduit.productionready.io/api/user`, {
				method: 'PUT',
				headers,
				body: JSON.stringify(body)
			}).then((response) => {
				if (response.ok) {
					return response.json();
				}
				return null;
			});
		}
	}

	async createArticle(token, { title, shortDescription, text, tags }) {
		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`
		};
		const bodyReq = {
			article: {
				title,
				description: shortDescription,
				body: text,
				tagList: tags
			}
		};
		try {
			const response = await fetch(`https://conduit.productionready.io/api/articles`, {
				method: 'POST',
				headers,
				body: JSON.stringify(bodyReq)
			});
			if (response.ok) {
				return response.json();
			}
			return null;
		} catch (error) {
			const response = await fetch(`https://conduit.productionready.io/api/articles`, {
				method: 'POST',
				headers,
				body: JSON.stringify(bodyReq)
			});
			if (response.ok) {
				return response.json();
			}
			return null;
		}
	}

	async deleteArticle(token, slug) {
		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`
		};
		try {
			const response = await fetch(`https://conduit.productionready.io/api/articles/${slug}`, {
				method: 'DELETE',
				headers
			});
			if (response.ok) {
				return response.json();
			}
			return null;
		} catch (error) {
			const response = await fetch(`https://conduit.productionready.io/api/articles/${slug}`, {
				method: 'DELETE',
				headers
			});
			if (response.ok) {
				return response.json();
			}
			return null;
		}
	}

	async editArticle(token, slug, data) {
		const { title, shortDescription, tags, text } = data;
		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`
		};
		const body = {
			article: {
				title,
				description: shortDescription,
				tagList: tags,
				body: text
			}
		};
		try {
			const response = await fetch(`https://conduit.productionready.io/api/articles/${slug}`, {
				method: 'PUT',
				headers,
				body: JSON.stringify(body)
			});
			if (response.ok) {
				return response.json();
			}
			return null;
		} catch (error) {
			const response = await fetch(`https://conduit.productionready.io/api/articles/${slug}`, {
				method: 'PUT',
				headers,
				body: JSON.stringify(body)
			});
			if (response.ok) {
				return response.json();
			}
			return null;
		}
	}
}
