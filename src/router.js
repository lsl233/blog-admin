import Editor from './View/Editor.svelte'
import Login from './View/Login.svelte'
import Articles from './View/Articles.svelte'

export default {
	'/login': Login,
	'/editor': Editor,
	'/editor/:id': Editor,
	'/articles': Articles
}
