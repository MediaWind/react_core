// Code from https://usehooks-ts.com/react-hook/use-read-local-storage

// This code deffer from the original in the essence that the value isn't json parsed
// More event listener were also added

import { useCallback, useEffect, useState } from "react";

import { useEventListener } from "usehooks-ts";

type Value<T> = T | null;

function useReadLocalStoragePlain<T>(key: string): Value<T> {
	// Get from local storage then
	// parse stored json or return initialValue
	const readValue = useCallback((): Value<T> => {
		// Prevent build error "window is undefined" but keep keep working
		if (typeof window === "undefined") {
			return null;
		}

		try {
			const item = window.localStorage.getItem(key);
			return item ? item as T : null;
		} catch (error) {
			console.warn(`Error reading localStorage key “${key}”:`, error);
			return null;
		}
	}, [key]);

	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, setStoredValue] = useState<Value<T>>(readValue);

	// Listen if localStorage changes
	useEffect(() => {
		setStoredValue(readValue());
	}, []);

	const handleStorageChange = useCallback(
		(event: StorageEvent | CustomEvent) => {
			if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
				return;
			}
			setStoredValue(readValue());
		},
		[key, readValue]
	);

	// this only works for other documents, not the current one
	useEventListener("storage", handleStorageChange);

	// this is a custom event, triggered in writeValueToLocalStorage
	// See: useLocalStorage()
	useEventListener("local-storage", handleStorageChange);

	// custom listener
	window.addEventListener("storage", handleStorageChange);
	document.addEventListener("storage" as any, handleStorageChange);
	window.onstorage = handleStorageChange; // Works on CMP4

	return storedValue;
}

export default useReadLocalStoragePlain;
