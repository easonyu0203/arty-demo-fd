<script lang="ts">
	const articles = [
		{
			src: 'https://arty-demo-fd.vercel.app/',
			img_src: '/home.png',
			t1: 'On the cloud!',
			t2: 'Checkout my real website',
			content:
				'I have deploy it to a public url so you can visit it from anywhere, just click this card!'
		},
		{
			src: 'https://kit.svelte.dev/',
			img_src: 'https://kit.svelte.dev/_app/immutable/assets/svelte-kit-machine.3af040cb.png',
			t1: 'What I learn',
			t2: 'Sveltekit is awesome',
			content:
				'In this project, I use sveltekit as my frontend and hosting framework, using sveltekit, I can easily set up a multipage application in no time!'
		},
		{
			src: 'https://huggingface.co/',
			img_src: 'https://huggingface.co/datasets/huggingface/brand-assets/resolve/main/hf-logo.png',
			t1: 'Playing with Image classification',
			t2: 'Huggyface ML model',
			content:
				'For prediction, I use huggyface model, which is a pretrained model for image classification, I use this model to predict the image that I take from my phone camera, and it works really well!'
		},
		{
			src: 'https://fastapi.tiangolo.com/lo/',
			img_src: 'https://miro.medium.com/v2/resize:fit:1200/1*L6Eaowb7nHrLSiH41Tp4sA.png',
			t1: 'Easy backend',
			t2: 'Fast API really fast!!',
			content:
				'For my backend, I use FastAPI, which is a python framework for building API, I use this framework because it is really fast and easy to use, and it is also easy to deploy!'
		},
		{
			src: 'https://vercel.com',
			img_src:
				'https://images.squarespace-cdn.com/content/v1/5cc22d6593a63233d214110c/1597710652025-QEY2UL92MLE1E2BX4WSJ/Vercel+%28Zeit%29.jpg',
			t1: 'Deploy frontend',
			t2: 'Vercel with sveltekit',
			content:
				'For my frontend, I use vercel to deploy my sveltekit application, it support continuous deployment, so I can easily deploy my frontend with every push to my github repository!'
		},
		{
			src: 'https://cloud.google.com/',
			img_src: 'https://www.freecodecamp.org/news/content/images/2020/10/gcp.png',
			t1: 'Deploy backend',
			t2: 'GCP with FastAPI and Docker',
			content:
				'For my backend, I use GCP as my cloud provider, first I docker my fastapi then deploy to GCP Cloud run, it is really easy to deploy, and it is also easy to scale!'
		}
	];
</script>

<div class="container max-h-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 space-y-2 p-4">
	{#each articles as article}
		<a href={article.src} class="card card-hover overflow-hidden mx-4" target="_blank">
			<header>
				<img src={article.img_src} class="bg-black/10 w-full object-cover h-64" alt="Post" />
			</header>
			<div class="p-4 space-y-4">
				<h6 class="h6">{article.t1}</h6>
				<h3 class="h3" data-toc-ignore>{article.t2}</h3>
				<article>
					<p>
						{article.content}
					</p>
				</article>
			</div>
		</a>
	{/each}
</div>
