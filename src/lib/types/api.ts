type PredictRequestDto = {
	base64_img: string;
};

type PredictDto = {
	score: number;
	label: string;
};
