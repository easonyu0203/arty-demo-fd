import { writable } from 'svelte/store';

type Camera = {
	is_user_mode: boolean;
	is_camera_on: boolean;
	data_url_img: string | null;
	stream: MediaStream | null;
	predictions: PredictDto[];
	is_requesting: boolean;
	getVideoStreamAsync: (videoElement: HTMLVideoElement) => Promise<void>;
	getPredictionsAsync: (videoElement: HTMLVideoElement) => Promise<void>;
};

export const CameraStore = writable<Camera>({
	is_user_mode: true,
	is_camera_on: false,
	data_url_img: null,
	stream: null,
	predictions: [],
	is_requesting: false,
	getVideoStreamAsync: async (videoElement: HTMLVideoElement) => {
		let is_user_mode = false;
		CameraStore.update((store) => {
			is_user_mode = !store.is_user_mode;
			return {
				...store,
				is_user_mode: !store.is_user_mode,
				is_camera_on: false,
				data_url_img: null,
				stream: null
			};
		});

		// get video stream
		const stream = await navigator.mediaDevices.getUserMedia({
			video: {
				facingMode: is_user_mode ? 'user' : 'environment',
				width: { ideal: 480 },
				height: { ideal: 480 }
			}
		});

		// update video element stream source
		videoElement.srcObject = stream;

		CameraStore.update((store) => {
			return { ...store, stream, is_camera_on: true };
		});
	},

	getPredictionsAsync: async (videoElement: HTMLVideoElement): Promise<void> => {
		let store: any;
		CameraStore.update((value) => {
			store = value;
			return { ...value, is_requesting: true };
		});

		if (!videoElement || !store.is_camera_on) return;

		// capture frame
		const canvas = document.createElement('canvas');
		canvas.width = videoElement.videoWidth;
		canvas.height = videoElement.videoHeight;
		canvas.getContext('2d')?.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
		const base64_img = canvas.toDataURL('image/jpeg');

		// return if no image
		if (!base64_img) return;

		console.log('send request');
		// Send image data URL
		const payload: PredictRequestDto = { base64_img };
		const response = await fetch(import.meta.env.VITE_PREDICT_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		});

		// Handle response from endpoint
		const result = await response.json();

		// Update store
		CameraStore.update((store) => {
			return { ...store, predictions: result, is_requesting: false };
		});
	}
});
