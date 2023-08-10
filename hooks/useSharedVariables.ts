import { useCallback, useState } from "react";

import { useEventListener } from "usehooks-ts";

export type sharedVariable = string | null;

function readValue(key: string): string | null {
	// Prevent build error "window is undefined"
	if (typeof window === "undefined") {
		return null;
	}

	try {
		const item = window.localStorage.getItem(key);
		return item ? item : null;
	} catch (error) {
		console.warn(`Error reading localStorage key “${key}”:`, error);
		return null;
	}
}

/**
 * This hook can only exist once per widget, usually placed inside the App.tsx
 * 
 * Provided with an array of shared variable name the hook will return an array of the last updated value in the same order
 */
const useSharedVariables = (...names: string[]): Array<sharedVariable> => {
	names = names.map((name) => "v_" + name);

	const [variables, setVariables] = useState<Array<sharedVariable>>(new Array(names.length).fill(null));

	const handleStorageChange = useCallback(
		(event: StorageEvent | CustomEvent) => {
			let key = (event as StorageEvent)?.key;

			if (key == null || key == undefined) key = (event as any).name;

			if (key == null) return;

			if (!names.includes(key)) return;

			const valueIndex = names.indexOf(key as string);
			const value = readValue(key as string);

			if (value != null && value != variables[valueIndex]) {
				setVariables((current) => {
					const newVariables = [...current];

					if (value != null && value != newVariables[valueIndex]) {
						newVariables[valueIndex] = value;
					}

					return newVariables;
				});
			}
		},
		[names]
	);

	// this only works for other documents, not the current one
	useEventListener("storage", handleStorageChange);

	// this is a custom event, triggered in writeValueToLocalStorage
	// See: useLocalStorage()
	useEventListener("local-storage", handleStorageChange);

	// custom listener
	window.addEventListener("storage", handleStorageChange); // Works on LMP-K with edit in generate
	document.addEventListener("storage" as any, handleStorageChange);
	window.onstorage = handleStorageChange; // Works on CMP4

	return variables;
};

export default useSharedVariables;
