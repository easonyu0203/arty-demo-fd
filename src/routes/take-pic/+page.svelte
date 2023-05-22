<script lang="ts">
	import { onMount } from 'svelte';
	import { CameraStore } from '$lib/stores/CameraStore';
	import { ProgressBar } from '@skeletonlabs/skeleton';

	let videoElement: HTMLVideoElement;

	onMount(async () => {
		await $CameraStore.getVideoStreamAsync();
		videoElement.srcObject = $CameraStore.stream;
	});
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col md:flex-row md:gap-8 items-center">
		<!-- webcam display -->
		<div class=" relative">
			<video
				hidden={!$CameraStore.is_camera_on}
				class=" rounded max-w-xs md:max-w-md"
				playsinline
				autoplay
				muted
				bind:this={videoElement}
			/>
			{#if $CameraStore.is_camera_on == false}
				<div class="text-2xl">Loading Camera...</div>
			{/if}
		</div>

		<div class="flex flex-col space-y-6">
			<!-- display predictions -->
			<ul class="list w-80 md:w-[28rem] flex flex-col gap-4">
				{#each $CameraStore.predictions as predict}
					<div class=" flex flex-col gap-1">
						<span class="flex-auto">
							<dt class=" flex justify-between text-sm">
								<span>{predict.label}</span>
								<span>{(predict.score * 100).toFixed(1)} %</span>
							</dt>
						</span>
						<ProgressBar label="Progress Bar" height="h-2" value={predict.score * 100} />
					</div>
				{/each}
			</ul>

			<!-- actions -->
			<div class=" flex gap-4">
				<button
					on:click={async () => await $CameraStore.getPredictionsAsync(videoElement)}
					type="button"
					class="btn variant-ringed-primary px-8">Predict</button
				>
				<button type="button" class="btn variant-ringed-error">Report Error</button>
			</div>
		</div>
	</div>
</div>
