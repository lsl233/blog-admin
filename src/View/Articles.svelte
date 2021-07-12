<script>
import { link } from 'svelte-spa-router'
import http from '../utils/http'

let articles = []
const getArticles = async () => {
	const [res, err] = await http.get(`/api/v1/articles`)
	articles = res.data.list
}

const handleDelete = async (id) => {
	const [res, err] = await http.delete(`/api/v1/auth/articles/${id}`)
	getArticles()
    console.log(res, err)
}

getArticles()
</script>

<div class="container">
    <div class="header">
	    <h1>文章</h1>
        <a class="btn" href="/editor" use:link>新建</a>
    </div>

	<table>
		<thead>
		<tr>
			<th>标题</th>
			<th width="140px">操作</th>
		</tr>
		</thead>

		<tbody>
        {#each articles as item}
			<tr>
				<td>{item.title}</td>
				<td>
					<a href="/editor/{item.id}" use:link>编辑</a>
					<!-- svelte-ignore a11y-missing-attribute -->
					<a on:click={() => handleDelete(item.id)} class="color-red">删除</a>
				</td>
			</tr>
        {/each}
		</tbody>
	</table>
</div>

<style>
	th, td {
		padding: 5px 8px;
	}

	td {
		border: 1px solid #d4d4d4;
	}

	th {
		background-color: #555;
		border: 1px solid #555;
		color: #fff;
	}

	table {
		border-collapse: collapse;
	}

	table tr:nth-child(odd) {
		background-color: #f6f4f0;
	}
</style>
