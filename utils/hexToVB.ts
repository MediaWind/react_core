function hexToVB(hex: string): number {
	hex = hex.replace("#", "");

	return parseInt(hex, 16);
}

export default hexToVB;
