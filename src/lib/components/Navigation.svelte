<script lang="ts">
	import { page } from '$app/stores';
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';

	$: classesActive = (href: string) => (href === $page.url.pathname ? '!bg-primary-500' : '');
</script>

<nav class="list-nav p-4 mt-4">
	<ul>
		<li>
			<a on:click={() => drawerStore.close()} href="/" class={classesActive('/')}> Home </a>
		</li>
		<li>
			<a on:click={() => drawerStore.close()} href="/take-pic" class={classesActive('/take-pic')}>
				Take Pictures
			</a>
		</li>
		<!-- <li>
			<a on:click={() => drawerStore.close()} href="/report" class={classesActive('/report')}>
				Report Error
			</a>
		</li> -->
	</ul>
</nav>
