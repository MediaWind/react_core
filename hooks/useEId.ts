import { useEffect, useState } from "react";
import axios from "axios";

import { sharedVariable } from "./useSharedVariables";

export enum eIdStatus {
	INSERTED = "eid_inserted",
	READ = "eid_read",
	REMOVED = "eid_removed",
}

export interface eIdData {
	firstName: string;
	lastName: string;
	addressZip: string;
	dateOfBirth: string;
	locationOfBirth: string;
	nationalNumber: string;
	nationality: string;
	gender: string;
}

const useEId = (eIdInserted: sharedVariable, eIdRead: sharedVariable, eIdRemoved: sharedVariable): [eIdStatus, eIdData | null] => {
	const [status, setStatus] = useState<eIdStatus>(eIdStatus.REMOVED);
	const [data, setData] = useState<eIdData | null>(null);

	useEffect(() => {
		if (eIdInserted != null) {
			setStatus(eIdStatus.INSERTED);
			setData(null);
		}
	}, [eIdInserted]);

	useEffect(() => {
		if (eIdRead != null) {
			setStatus(eIdStatus.READ);

			axios.get("http://localhost:5000/?action&read_eid", {
				withCredentials: false,
			}).then((result) => {
				if (result?.data?.status == true) {
					setData({
						addressZip: result.data.eid.address_zip,
						dateOfBirth: result.data.eid.date_of_birth,
						firstName: result.data.eid.firstname,
						gender: result.data.eid.gender,
						lastName: result.data.eid.lastname,
						locationOfBirth: result.data.eid.location_of_birth,
						nationalNumber: result.data.eid.national_number,
						nationality: result.data.eid.nationality,
					} as eIdData);
				} else {
					setData(null);
				}
			}).catch(() => {
				setData(null);
			});
		}
	}, [eIdRead]);

	useEffect(() => {
		if (eIdRemoved != null) {
			setStatus(eIdStatus.REMOVED);
			setData(null);
		}
	}, [eIdRemoved]);

	return [status, data];
};

export default useEId;
