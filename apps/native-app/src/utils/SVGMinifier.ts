class SVGminifier {
	private minifiedPath: string;

	private viewportXmin: number;

	private viewportXmax: number;

	private viewportYmin: number;

	private viewportYmax: number;

	constructor(initialPath: string) {
		const values: number[] = initialPath
			.split("L")
			.join(" ")
			.split("M")
			.join(" ")
			.split("Z")
			.join("")
			.split(" ")
			.filter((el) => el !== "")
			.map((el) => parseFloat(el));
		let Xs = values.filter((_, index) => index % 2 === 0);
		let Ys = values.filter((_, index) => index % 2 !== 0);
		const minX = Math.min(...Xs);
		const maxX = Math.max(...Xs);
		const minY = Math.min(...Ys);
		const maxY = Math.max(...Ys);
		const subRatio = Math.max(maxX, maxY) > 100 ? 1 : 0;
		const ratio = subRatio ? 1 : 10000;
		Xs = Xs.map((el) => (el - minX) * ratio);
		Ys = Ys.map((el) => (el - minY) * ratio);

		this.minifiedPath = `M ${Xs[0]} ${Ys[0]} L ${Xs.slice(1)
			.map((el, index) => `${el} ${Ys.slice(1)[index]} `)
			.join(" ")}Z`;
		this.viewportXmax = Math.max(maxX - minX, maxY - minY) * ratio;
		this.viewportYmax = this.viewportXmax;
		this.viewportXmin = maxX - minX > maxY - minY ? 0 : ((maxX - minX - (maxY - minY)) * ratio) / 2;
		this.viewportYmin = maxY - minY > maxX - minX ? 0 : ((maxY - minY - (maxX - minX)) * ratio) / 2;
	}

	getMinifiedPath = (): string => this.minifiedPath;

	getViewportAsString = (): string => {
		if (
			Number.isNaN(this.viewportXmin) ||
			Number.isNaN(this.viewportXmax) ||
			Number.isNaN(this.viewportYmin) ||
			Number.isNaN(this.viewportYmax)
		)
			return "";
		return `${this.viewportXmin} ${this.viewportYmin} ${this.viewportXmax} ${this.viewportYmax}`;
	};
}

export default SVGminifier;
