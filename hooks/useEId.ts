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

const useEId = (
	eIdInserted: sharedVariable,
	eIdRead: sharedVariable,
	eIdRemoved: sharedVariable,
	eIdError: sharedVariable
): [eIdStatus, eIdData | null, string ] => {

	const [status, setStatus] = useState<eIdStatus>(eIdStatus.REMOVED);
	const [error, setError] = useState<"" | "unresponsive_card" | "unknown_card">("");
	const [data, setData] = useState<eIdData | null>(null);

	useEffect(() => {
		if (eIdInserted != null) {
			setStatus(eIdStatus.INSERTED);
			setData(null);
			setError("");
		}
	}, [eIdInserted]);

	useEffect(() => {
		axios.get("http://localhost:5000/?action&read_eid_error", {
			withCredentials: false,
		}).then((result) => {
			setError(result.data.error ? result.data.message : "");
		});

	}, [eIdError]);

	useEffect(() => {
		if (eIdRead != null) {
			setStatus(eIdStatus.READ);

			axios.get("http://localhost:5000/?action&read_eid", {
				withCredentials: false,
			}).then((result) => {
				if (result?.data?.status == true) {
					setData({
						addressZip: result.data.eid.address_zip,
						addressMunicipality: result.data.eid.address_municipality,
						addressStreetAndNumber: result.data.eid.address_street_and_number,
						cardNumber: result.data.eid.card_number,
						dateOfBirth: result.data.eid.date_of_birth,
						firstName: result.data.eid.firstname,
						gender: result.data.eid.gender,
						lastName: result.data.eid.lastname,
						locationOfBirth: result.data.eid.location_of_birth,
						nationalNumber: result.data.eid.national_number,
						nationality: result.data.eid.nationality,
						validityBeginDate: result.data.eid.validity_begin_date,
						validityEndDate: result.data.eid.validity_end_date,
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
			setError("");
		}
	}, [eIdRemoved]);

	return [status, data, error];
};

export default useEId;
