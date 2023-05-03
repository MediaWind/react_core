import sendSharedVariable from "../sendSharedVariable";

export enum DPMS {
	ACTIVATE = "on",
	DEACTIVATE = "off",
}

export default class Dpms {
	public static set(status: DPMS) {
		sendSharedVariable({
			name: "change_display_status",
			value: status as string,
		});
	}
}
