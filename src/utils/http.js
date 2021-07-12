import config from '../config'
import t from '../lib/toolMan'

class Http {
	constructor (api) {
		this.api = api
		this.defaultOptions = {
			mode: 'cors',
			// credentials: 'include',
			headers: new Headers({
				'Accept': 'application/json',
				'Token': t.store.get('token', String)
			})
		}
	}

	mergeOptions (options) {
		return Object.assign({}, this.defaultOptions, options)
	}

	obj2QueryString (obj) {
		if (!obj || !obj.keys) return ''
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

	request(path, options) {
		if (options.method === 'GET') {
			path += this.obj2QueryString(options.data)
		}

		if (t.equal(options.method, 'POST', 'DELETE')) {
			options.body = JSON.stringify(options.data)
		}

		delete options.data
		options = this.mergeOptions(options)

		return this.handleResult(fetch(this.api + path, options))
	}

	get (path, data) {
		return this.request(path, {
			data,
			method: 'GET',
		})
	}

	post (path, data) {
		return this.request(path, {
			data,
			method: 'POST',
		})
	}

	delete(path, data) {
		return this.request(path, {
			data,
			method: 'DELETE',
		})
	}
}

export default new Http(config.api)
