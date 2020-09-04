export default class ServiceApi {
	headers(token = null) {
		if (token === null) {
			const headers = {
				'Content-Type': 'application/json'
			};
			return headers;
		} else {
			const headers = {
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`
			};
			return headers;
		}
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
		if (token !== null) {
			try {
				const response = await fetch(`https://conduit.productionready.io/api/articles?offset=${offset}`, {
					method: 'GET',
					headers: this.headers(token)
				});
				return await response.json();
			} catch (error) {
				const response = await fetch(`https://conduit.productionready.io/api/articles?offset=${offset}`, {
					method: 'GET',
					headers: this.headers(token)
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
			try {
				const response = await fetch(`https://conduit.productionready.io/api/articles/${slug}`, {
					method: 'GET',
					headers: this.headers(token)
				});
				return await response.json();
			} catch (error) {
				const response = await fetch(`https://conduit.productionready.io/api/articles/${slug}`, {
					method: 'GET',
					headers: this.headers(token)
				});
				const res = await response.json();
				return res;
			}
		} else {
			try {
				const response = await fetch(`https://conduit.productionready.io/api/articles/${slug}`);
				return await response.json();
			} catch (error) {
				const response = await fetch(`https://conduit.productionready.io/api/articles/${slug}`);
				const res = await response.json();
				return res;
			}
		}
	}

	async signUp(body) {
		return fetch(`https://conduit.productionready.io/api/users`, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: this.headers()
		}).then((response) => {
			return response.json();
		});
	}

	async sigIn(body) {
		return fetch(`https://conduit.productionready.io/api/users/login`, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: this.headers()
		}).then((response) => {
			return response.json();
		});
	}

	async setLike(slug, token = null) {
		try {
			return fetch(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {
				method: 'POST',
				headers: this.headers(token)
			}).then((response) => {
				return response.json();
			});
		} catch (error) {
			return fetch(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {
				method: 'POST',
				headers: this.headers(token)
			}).then((response) => {
				return response.json();
			});
		}
	}

	async unsetLike(slug, token = null) {
		try {
			return fetch(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {
				method: 'DELETE',
				headers: this.headers(token)
			}).then((response) => {
				return response.json();
			});
		} catch (error) {
			return fetch(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {
				method: 'DELETE',
				headers: this.headers(token)
			}).then((response) => {
				return response.json();
			});
		}
	}

	async updateUser(data, token) {
		const { email, url, username, password } = data;
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
				headers: this.headers(token),
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
				headers: this.headers(token),
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
				headers: this.headers(token),
				body: JSON.stringify(bodyReq)
			});
			if (response.ok) {
				return response.json();
			}
			return null;
		} catch (error) {
			const response = await fetch(`https://conduit.productionready.io/api/articles`, {
				method: 'POST',
				headers: this.headers(token),
				body: JSON.stringify(bodyReq)
			});
			if (response.ok) {
				return response.json();
			}
			return null;
		}
	}

	async deleteArticle(token, slug) {
		try {
			const response = await fetch(`https://conduit.productionready.io/api/articles/${slug}`, {
				method: 'DELETE',
				headers: this.headers(token)
			});
			if (response.ok) {
				return response.json();
			}
			return null;
		} catch (error) {
			const response = await fetch(`https://conduit.productionready.io/api/articles/${slug}`, {
				method: 'DELETE',
				headers: this.headers(token)
			});
			if (response.ok) {
				return response.json();
			}
			return null;
		}
	}

	async editArticle(token, slug, data) {
		const { title, shortDescription, tags, text } = data;
		// const headers = {
		// 	'Content-Type': 'application/json',
		// 	Authorization: `Token ${token}`
		// };
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
				headers: this.headers(token),
				body: JSON.stringify(body)
			});
			if (response.ok) {
				return response.json();
			}
			return null;
		} catch (error) {
			const response = await fetch(`https://conduit.productionready.io/api/articles/${slug}`, {
				method: 'PUT',
				headers: this.headers(token),
				body: JSON.stringify(body)
			});
			if (response.ok) {
				return response.json();
			}
			return null;
		}
	}
}

export const myService = new ServiceApi();
