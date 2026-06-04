import { DependencyList, RefObject, useLayoutEffect, useRef } from "react";
import { runTextAutoFit, TextAutoFitItem } from "./textAutoFit";

export type UseTextAutoFitOptions = {
	parentRef: RefObject<HTMLDivElement>;
	items: TextAutoFitItem[];
	settings: any;
	deps: DependencyList;
	enabled?: boolean;
	verbose?: boolean;
};

export function useTextAutoFit({
	parentRef,
	items,
	settings,
	deps,
	enabled = true,
	verbose = false,
}: UseTextAutoFitOptions): void {
	const parentRefRef = useRef(parentRef);
	const itemsRef = useRef(items);
	const settingsRef = useRef(settings);
	const enabledRef = useRef(enabled);
	const verboseRef = useRef(verbose);

	parentRefRef.current = parentRef;
	itemsRef.current = items;
	settingsRef.current = settings;
	enabledRef.current = enabled;
	verboseRef.current = verbose;

	useLayoutEffect(() => {
		let isMounted = true;
		let firstFrameId: number | null = null;
		let secondFrameId: number | null = null;

		const run = () => {
			if (!isMounted || !enabledRef.current) return;

			runTextAutoFit(
				parentRefRef.current,
				itemsRef.current,
				settingsRef.current,
				verboseRef.current
			);
		};

		run();

		firstFrameId = requestAnimationFrame(() => {
			run();
			secondFrameId = requestAnimationFrame(() => {
				run();
			});
		});

		if (document.fonts?.ready) {
			document.fonts.ready.then(() => {
				run();
			}).catch(() => undefined);
		}

		return () => {
			isMounted = false;

			if (firstFrameId !== null) {
				cancelAnimationFrame(firstFrameId);
			}

			if (secondFrameId !== null) {
				cancelAnimationFrame(secondFrameId);
			}
		};
	}, deps);
}
