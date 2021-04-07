<script>
import { link } from 'svelte-spa-router'
import http from '../utils/http'

let articles = []
const getArticles = async () => {
	const [res, err] = await http.get(`/api/v1/articles`)
	articles = res.data.list
}

getArticles()
</script>

<div class="container">
	<h1>文章</h1>
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
