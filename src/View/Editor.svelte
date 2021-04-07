<script>
import { onMount } from 'svelte'
import SimpleMDE from 'simplemde'
import 'simplemde/dist/simplemde.min.css'
import http from '../utils/http'

export let params = {}

let timer
let id
let simplemde

const handleEditorChange = async (ctx) => {
	timer && clearTimeout(timer)
	timer = setTimeout(async () => {
		timer && clearTimeout(timer)
		let res, err
        const value = ctx.value()
        if (id) {
            [res, err] = await http.post(`/api/v1/articles/${id}`, { markdown: value })
        } else {
	        [res, err] = await http.post(`/api/v1/articles`, { markdown: value })
	        id = res.data.id
        }
	}, 300)
}

const initEditor = () => {
	simplemde = new SimpleMDE({
		element: document.getElementById('editor'),
		toolbar: false,
		status: false,
		autoDownloadFontAwesome: false,
		spellChecker: false
	})

	simplemde.codemirror.on('change', () => handleEditorChange(simplemde))
}

const getArticle = async () => {
	const [res, err] = await http.get(`/api/v1/articles/${id}`)
	simplemde.value(res.data.content)
    console.log(res)
}

onMount(async () => {
	id = params.id
	initEditor()

    id && getArticle()
})

</script>

<div class="container">
	<h1>编辑器</h1>
	<textarea id="editor"></textarea>
</div>
