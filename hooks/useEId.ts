import { useEffect, useState } from "react";
import axios from "axios";

import { sharedVariable } from "./useSharedVariables";

export enum eIdStatus {
	INSERTED = "eid_inserted",
	READ = "eid_read",
	REMOVED = "eid_removed",
}

export interface eIdData {
	firstName: string,
	lastName: string,
	addressStreetAndNumber: string,
	addressZip: string,
	addressMunicipality: string,
	dateOfBirth: string,
	locationOfBirth: string,
	nationalNumber: string,
	nationality: string,
	gender: string,
	cardNumber: string,
	validityBeginDate: string,
	validityEndDate: string,
	issuingMunicipality: string,
	firstLetterOfThirdGivenName: string,
	specialStatus: string,
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
		if (eIdError !== null) {
			axios.get("http://localhost:5000/?action&read_eid_error", {
				withCredentials: false,
			}).then((result) => {
				setError(result.data.error ? result.data.message : "");
			});
		}
	}, [eIdError]);

	useEffect(() => {
		if (eIdRead != null) {
			axios.get("http://localhost:5000/?action&read_eid", {
				withCredentials: false,
			}).then((result) => {
				if (result?.data?.status == true) {
					setData({
						firstName: result.data.eid.firstname,
						lastName: result.data.eid.lastname,
						addressStreetAndNumber: result.data.eid.address_street_and_number,
						addressZip: result.data.eid.address_zip,
						addressMunicipality: result.data.eid.address_municipality,
						dateOfBirth: result.data.eid.date_of_birth,
						locationOfBirth: result.data.eid.location_of_birth,
						nationalNumber: result.data.eid.national_number,
						nationality: result.data.eid.nationality,
						gender: result.data.eid.gender,
						cardNumber: result.data.eid.card_number,
						validityBeginDate: result.data.eid.validity_begin_date,
						validityEndDate: result.data.eid.validity_end_date,
						chipNumber: result.data.eid.chip_number ?? "",
						issuingMunicipality: result.data.eid.issuing_municipality ?? "",
						specialStatus: result.data.eid.special_status ?? "",
						firstLetterOfThirdGivenName: result.data.eid.first_letter_of_third_given_name ?? "",
					} as eIdData);
				} else {
					setData(null);
				}
			}).catch(() => {
				setData(null);
			}).finally(() => {
				setStatus(eIdStatus.READ);
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
