import axios from "axios";

import { DefaultVariables } from "./variables";

interface ISendSharedVariableParams {
	name: string;
	value: string;
	playerId?: number;
	playerKey?: string;
	accountRef?: string;
	accountKey?: string;
	domaineHttp?: string;
	callback?: (status: boolean) => void;
}

export default async function sendSharedVariable({
	name, 
	value, 
	playerId = DefaultVariables.ID_PLAYER, 
	playerKey = DefaultVariables.PLAYER_KEY,
	accountRef = DefaultVariables.ACCOUNT_REF,
	accountKey = DefaultVariables.ACCOUNT_KEY,
	domaineHttp = DefaultVariables.DOMAINE_HTTP,
	callback = undefined,
}: ISendSharedVariableParams) {
	const url = `${domaineHttp}/services/shared/shared_unique.php?ref_account=${encodeURIComponent(accountRef)}&key_account=${encodeURIComponent(accountKey)}&id_player=${playerId}&key_player=${encodeURIComponent(playerKey)}&name=${encodeURIComponent(name)}&value=${encodeURIComponent(value)}`;

	try {
		const result = await axios.get(url, {
			withCredentials: false,
		});

		if (callback != undefined) {
			if (result.data.status == "success") {
				callback(true);
			} else {
				callback(false);
			}
		}
	} catch (error) {
		if (callback != undefined) {
			callback(false);
		}
	}
}
