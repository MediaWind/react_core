function groupBy<T>(array: any[], groupLength: number): T[][] {
	const result = [] as any[];

	array.forEach((item, index) => {
		const normalizedIndex = Math.floor(index / groupLength);

		if (result[normalizedIndex] === undefined) {
			result[normalizedIndex] = [];
		}

		result[normalizedIndex].push(item);
	});

	return result;
}

export default groupBy;
