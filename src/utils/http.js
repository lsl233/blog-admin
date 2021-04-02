import config from '../config'

class Http {
	constructor (api) {
		this.api = api
		this.defaultOptions = {
			mode: 'cors',
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
		if (data && data.data) {
			path += this.obj2QueryString(data.data)
			delete data.data
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
		return fetch(this.api + path, {
			body: JSON.stringify(data),
			method: 'POST',
			mode: 'cors',
			headers: new Headers({
				'Accept': 'application/json'
			})
		})

	}
}

export default new Http(config.api)
