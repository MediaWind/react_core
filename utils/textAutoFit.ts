import { RefObject } from "react";

export type TextAutoFitItem = {
	ref: RefObject<HTMLDivElement>;
	size: number;
	minSizePx?: number;
};

export function runTextAutoFit(
	parentRef: RefObject<HTMLDivElement>,
	items: TextAutoFitItem[],
	settings: any,
	verbose = false
): void {
	const log = (...args: any[]) => {
		if (verbose) {
			console.log("[textAutoFit]", ...args);
		}
	};

	const parent = parentRef.current;
	const itemElements = items.map((item) => item.ref.current);

	if (!parent) {
		log("Skipped: parentRef.current is missing");
		return;
	}
	if (items.length === 0) {
		log("Skipped: no items");
		return;
	}
	if (!itemElements.every((element): element is HTMLDivElement => element !== null)) {
		log("Skipped: one or more item refs are missing");
		return;
	}

	const rawFontSizePercent = Number(settings.w_font_size_percent);
	const fontScale = Number.isFinite(rawFontSizePercent) && rawFontSizePercent > 0
		? rawFontSizePercent / 100
		: 1;
	const remValue = 22;

	const currentFontSizes = items.map((item) => item.size * fontScale * remValue);
	if (currentFontSizes.some((size) => !Number.isFinite(size) || size <= 0)) {
		log("Aborted: invalid initial font sizes", currentFontSizes);
		return;
	}

	log("Start", {
		itemCount: items.length,
		rawFontSizePercent,
		fontScale,
		initialFontSizes: [...currentFontSizes],
		parentClientHeight: parent.clientHeight,
		parentScrollHeight: parent.scrollHeight,
		parentClientWidth: parent.clientWidth,
		parentScrollWidth: parent.scrollWidth,
	});

	itemElements.forEach((element, index) => {
		element.style.fontSize = `${currentFontSizes[index]}px`;
	});

	const hasOverflow = () => {
		const parent = parentRef.current;

		if (!parent) {
			return false;
		}

		return parent.clientHeight < parent.scrollHeight || parent.clientWidth < parent.scrollWidth;
	};

	let overflow = hasOverflow();
	let iterationCount = 0;
	const maxIterations = 60;

	log("Initial overflow check", {
		overflow,
		parentClientHeight: parent.clientHeight,
		parentScrollHeight: parent.scrollHeight,
	});

	while (overflow && iterationCount < maxIterations) {
		iterationCount += 1;

		for (let i = 0; i < currentFontSizes.length; i++) {
			const nextSize = currentFontSizes[i] / 1.1;

			if (!Number.isFinite(nextSize) || nextSize >= currentFontSizes[i]) {
				log("Aborted: invalid next size", {
					index: i,
					currentSize: currentFontSizes[i],
					nextSize,
					iterationCount,
				});
				return;
			}

			currentFontSizes[i] = nextSize;

			if (currentFontSizes[i] < (items[i].minSizePx ?? 5)) {
				log("Aborted: minimum size reached", {
					index: i,
					size: currentFontSizes[i],
					minSizePx: items[i].minSizePx ?? 5,
					iterationCount,
				});
				return;
			}
		}

		itemElements.forEach((element, index) => {
			element.style.fontSize = `${currentFontSizes[index]}px`;
		});

		overflow = hasOverflow();
		const currentParent = parentRef.current;

		log("Iteration", {
			iterationCount,
			overflow,
			fontSizes: [...currentFontSizes],
			parentClientHeight: currentParent?.clientHeight,
			parentScrollHeight: currentParent?.scrollHeight,
			parentClientWidth: currentParent?.clientWidth,
			parentScrollWidth: currentParent?.scrollWidth,
		});
	}

	if (iterationCount >= maxIterations && overflow) {
		log("Stopped: max iterations reached", {
			maxIterations,
			fontSizes: [...currentFontSizes],
		});
		return;
	}

	log("Done", {
		iterationCount,
		finalOverflow: overflow,
		finalFontSizes: [...currentFontSizes],
	});
}
