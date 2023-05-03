import { useEffect, useState } from "react";

import useReadLocalStoragePlain from "./useReadLocalStoragePlain";
import sendSharedVariable from "../sendSharedVariable";

const useSharedVariable = (name: string): [string, (value: string) => void] => {
	const [variable, setVariable] = useState<string>("");

	const update = (value: string): void => {
		sendSharedVariable({
			name,
			value: value as string,
		});
	};

	const data = useReadLocalStoragePlain<string>("v_" + name);

	useEffect(() => {
		if(data != variable) {
			setVariable(data as string);
		}
	}, [data]);

	return [variable, update];
};

export default useSharedVariable;
