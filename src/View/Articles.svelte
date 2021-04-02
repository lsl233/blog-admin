<script>
import http from '../utils/http'

let articles = []
const getArticles = async () => {
	const [res, err] = await http.get(`/api/v1/articles`)
	articles = res.data.list
}

getArticles()
</script>

<div class="container">
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
                    <button>编辑</button>
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

    table button {
        margin: 0;
        font-size: 12px;
    }

    table tr:nth-child(odd) {
	    background-color: #f6f4f0;
    }
</style>
