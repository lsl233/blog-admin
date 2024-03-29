(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.toolMan = factory());
}(this, (function () { 'use strict';

	function toolMan() {

	}

	toolMan.tagTester = function (name) {
		const tag = '[object ' + name + ']';
		return function (obj) {
			return Object.prototype.toString.call(obj) === tag
		}
	};

	toolMan.isFn = toolMan.tagTester('Function');

	toolMan.isEmpty = function (obj) {
		if (obj === undefined || obj === null || obj === '') return true
		if (Array.isArray(obj) && obj.length === 0) return true
		if (Object.keys(obj).length === 0) return true
		return false
	};

	toolMan.isBrowser = function () {
		return window && window.document
	};

	toolMan.isArray = window.isArray || toolMan.tagTester('Array');

	toolMan.isObject = toolMan.tagTester('Object');

	toolMan.isString = toolMan.tagTester('String');

	/**
	 * 格式化倒计时时间
	 * @param time
	 * @param formatTemp
	 * @returns {string}
	 */
	toolMan.formatCountDown = function (time, formatTemp = 'DD:HH:MM:SS') {
		const d = Math.floor(time / (1000 * 60 * 60 * 24));
		const h = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const m = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
		const s = Math.floor((time % (1000 * 60)) / 1000);
		const map = {
			d,
			h,
			m,
			s,
			DD: String(d).padStart(2, '0'),
			HH: String(h).padStart(2, '0'),
			MM: String(m).padStart(2, '0'),
			SS: String(s).padStart(2, '0'),
		};

		return formatTemp.replace(/(DD)|(HH)|(MM)|(SS)/g, substring => map[substring])
	};

	toolMan.tick = function (fn, ms = 1000) {
		const timer = setInterval(() => {
			fn(done);
		}, ms);
		const done = () => clearInterval(timer);
		fn(done);
	};

	toolMan.scrollTo = function (y, speed) {
		if (!speed) {
			document.body.scrollTop = document.documentElement.scrollTop = y;
			return
		}

		let nowTop = document.body.scrollTop + document.documentElement.scrollTop;

		const animation = () => {
			requestAnimationFrame(() => {
				if (nowTop === y) return
				nowTop = nowTop - speed;
				document.body.scrollTop = document.documentElement.scrollTop = nowTop;
				animation();
			});
		};
		animation();
	};

	const getValue = (obj, key) => obj[key];

	/**
	 *
	 * @param obj
	 * @param path
	 * @param defaultValue
	 * @returns {*}
	 */
	toolMan.deepGet = function (obj, path, defaultValue = void 0) {
		path = Array.isArray(path) ? path : path.split('.');
		for (const item of path) {
			obj = getValue(obj, item);
			if (!obj) return defaultValue
		}
		return obj
	};

	class Store {
		constructor () {
			this.cache = {};
		}

		get (key, converter) {
			let result;
			result = this.cache[key];
			if (result) {
				return result
			}
			const value = localStorage.getItem(key);
			if (toolMan.isFn(converter)) {
				result = converter(value);
			} else {
				result = JSON.parse(value);
			}
			this.cache[key] = result;
			return result
		}

		set (key, value, converter) {
			if (toolMan.isFn(converter)) {
				value = converter(value);
			} else {
				if (toolMan.isArray(value) || toolMan.isObject(value)) {
					value = JSON.stringify(value);
				} else {
					value = value.toString();
				}
			}
			localStorage.setItem(key, value);
		}

		clearCache(key) {
			if (key) {
				delete this.cache[key];
			} else {
				this.cache = {};
			}
		}
	}

	toolMan.store = new Store();

	toolMan.equal = function (value, ...args) {
		return args.includes(value)
	};

	return toolMan;

})));
