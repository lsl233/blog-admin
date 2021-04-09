<script>
import { push } from 'svelte-spa-router'
import http from '../utils/http'
import t from '../lib/toolMan'

let username = ''
let password = ''
let submitting = false
let errMsg = ''

const handleSubmit = async () => {
	submitting = true
	const [res, err] = await http.post('/api/v1/auth/', { username, password })
	if (err) {
		errMsg = err.msg || err.toString()
	} else {
		errMsg = ''
		t.store.set('token', res.data.token)
		console.log('登陆成功')
		push('/articles')
	}

	submitting = false
}
</script>

<div class="container">
	<h1>登陆</h1>
	<form on:submit|preventDefault={handleSubmit}>
		<input bind:value={username} placeholder="请输入账户" />
		<input bind:value={password} placeholder="请输入密码" type="password" />
		<button disabled="{submitting}" type="submit">登陆</button>
	</form>
    {#if errMsg}
		<p class="font-red">*{errMsg}</p>
    {/if}
</div>
