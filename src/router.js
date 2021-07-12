import Editor from './view/Editor.svelte'
import Login from './view/Login.svelte'
import Articles from './view/Articles.svelte'

export default {
	'/login': Login,
	'/editor': Editor,
	'/editor/:id': Editor,
	'/articles': Articles
}
