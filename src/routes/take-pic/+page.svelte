<script lang="ts">
	import { onMount } from 'svelte';
	import { CameraStore } from '$lib/stores/CameraStore';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { fade } from 'svelte/transition';
	import { Toast, toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

	let videoElement: HTMLVideoElement;

	const reportAction = () => {
		const toast: ToastSettings = {
			message: 'report wrong successfully!',
			timeout: 1500
		};
		toastStore.trigger(toast);
	};

	onMount(async () => {
		$CameraStore.video_element = videoElement;
		await $CameraStore.getVideoStreamAsync();
	});
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5 text-center flex flex-col md:flex-row md:gap-8 items-center">
		<!-- webcam display -->
		<div class=" relative flex justify-center items-center">
			<video
				hidden={!$CameraStore.is_camera_on}
				class=" rounded max-w-[65%] md:max-w-md"
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
				{#each $CameraStore.predictions as predict, index (index)}
					<div class=" flex flex-col gap-1">
						<span class="flex-auto">
							<dt class=" flex justify-between text-sm">
								<span>{$CameraStore.is_requesting ? 'none' : predict.label}</span>
								<span
									>{$CameraStore.is_requesting ? 'none' : (predict.score * 100).toFixed(1)} %</span
								>
							</dt>
						</span>
						<ProgressBar
							label="Progress Bar"
							height="h-1"
							value={$CameraStore.is_requesting ? 0 : predict.score * 100}
						/>
					</div>
				{/each}
			</ul>

			<!-- actions -->
			<div class=" flex gap-4 justify-center items-center">
				<button
					disabled={$CameraStore.is_requesting}
					on:click={async () => await $CameraStore.getPredictionsAsync()}
					type="button"
					class="btn variant-ringed-primary px-8">Predict</button
				>
				<button on:click={() => reportAction()} type="button" class="btn variant-ringed-error"
					>Report Error</button
				>
			</div>
		</div>
	</div>
</div>
