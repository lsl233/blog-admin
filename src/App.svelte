<script>
    import Router, { replace } from 'svelte-spa-router'
    import routes from './router'
    import t from './lib/toolMan'

    if (t.store.get('token', String)) {
	    replace('/articles')
    } else {
        replace('/login')
    }
</script>

<Router {routes} />

<style>

</style>
