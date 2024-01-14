export type Position = {
	x: number;
	y: number;
};

export type Size = {
	width: number;
	height: number;
};

export type SafeArea = Position & Size & {
	left: number;
	top: number;
	right: number;
	bottom: number;
	center: Position;
};
