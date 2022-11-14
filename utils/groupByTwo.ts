function groupByTwo<T>(array: any[]): T[][] {
	const result = [] as any[];

	array.forEach((item, index) => {
		const normalizedIndex = Math.floor(index / 2);

		if (result[normalizedIndex] === undefined) {
			result[normalizedIndex] = [];
		}

		result[normalizedIndex].push(item);
	});

	return result;
}

export default groupByTwo;
