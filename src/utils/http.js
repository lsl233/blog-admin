import config from '../config'

class Http {
	constructor (api) {
		this.api = api
		this.defaultOptions = {
			mode: 'cors',
			credentials: 'include',
			headers: new Headers({
				'Accept': 'application/json'
			})
		}
	}

	mergeOptions (options) {
		return Object.assign({}, this.defaultOptions, options)
	}

	obj2QueryString (obj) {
		if (!obj) return ''
		const keys = obj.keys()
		if (!keys.length) return ''
		const query = []
		for (const key of keys) {
			query.push(`${key}=${obj[key]}`)
		}
		return '?' + query.join('&')
	}

	handleResult (pr) {
		return pr.then(response => response.json())
			.then(res => {
				if (res.code === 200) {
					return [res, null]
				}
				return [null, res]
			})
			.catch(e => {
				console.error(e)
				return [null, e]
			})
	}

	get (path, data) {
		if (data) {
			path += this.obj2QueryString(data)
		}

		const options = this.mergeOptions({
			data,
			method: 'GET',
			mode: 'cors'
		})

		let url = this.api + path
		return this.handleResult(fetch(url, options))
	}

	post (path, data) {
		if (data) {
			data.body = JSON.stringify(data)
		}

		const options = this.mergeOptions({
			body: JSON.stringify(data),
			method: 'POST'
		})
		return this.handleResult(fetch(this.api + path, options))
	}
}

export default new Http(config.api)
