export function setIntervalSync(action: CallableFunction, interval: number): NodeJS.Timeout {
	const currentDate = new Date();
	const currentTime = currentDate.getTime();
	currentDate.setHours(0, 0, 0, 0);

	const baseTime = currentDate.getTime();
	const midnightTime = currentTime - baseTime;

	let init = false;

	const loop = setInterval(
		() => {
			if (!init){
				init = true;
				setTimeout(action(), interval - (midnightTime % interval));
			} else {
				return action();
			}
		}, interval
	);

	return loop;
}

export function setIntervalRange(action: CallableFunction, intervals: number[]): NodeJS.Timeout {
	if (intervals.length !== 2) {
		throw new Error("Logic error: `intervals` need to be an array of 2 number");
	}

	const interval = Math.floor(Math.random() * (intervals[1] - intervals[0]) ) + intervals[0];

	// console.log("setIntervalRange", interval);

	return setInterval(() => action(), interval);
}
