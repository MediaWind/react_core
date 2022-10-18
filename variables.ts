export enum ORIENTATION {
	VERTICAL = "vertical",
	HORIZONTAL = "horizontal",
}

export enum RATIO {
	V9_16 = "9:16",
	H16_9 = "16:9",
	H32_9 = "32:9",
	H14_9 = "14:9",
}

export class DefaultVariables {
	static ID_MEDIA = (process.env.NODE_ENV === "production" ? parseInt("{id_media}") : 0) as number;
	static WIDTH = (process.env.NODE_ENV === "production" ? parseInt("{width}") : 1920) as number;
	static HEIGHT = (process.env.NODE_ENV === "production" ? parseInt("{height}") : 1080) as number;
	static MODE_LAYOUT = process.env.NODE_ENV === "production" ? "{mode_layout}" : undefined;
	static ID_PLAYER = (process.env.NODE_ENV === "production" ? parseInt("{id_player}") : 0) as number;
	static SERIAL_PLAYER = (process.env.NODE_ENV === "production" ? "{serial_player}" : "0001C02A7E18") as string;
	static SERIAL = (process.env.NODE_ENV === "production" ? "{serial}" : "0001C02A7E18") as string;
	static KEY_PLAYER = (process.env.NODE_ENV === "production" ? "{key_player}" : "ay3asIzHnxI0Q") as string;
	static PLAYER_KEY = (process.env.NODE_ENV === "production" ? "{player_key}" : "ay3asIzHnxI0Q") as string;
	static WIDGET_FOLDER = (process.env.NODE_ENV === "production" ? "{widget_folder}" : "/") as string;
	static DOMAINE = (process.env.NODE_ENV === "production" ? "{domaine}" : "modules.greenplayer.com") as string;
	static DOMAINE_HTTP = (process.env.NODE_ENV === "production" ? "{domaine_http}" : "https://modules.greenplayer.com") as string;

	//TODO: replace variable tag by real one
	//TODO: adapt the type casting
	//TODO: check for boolean if it work correctly
	static TYPE_PLAYER = (process.env.NODE_ENV === "production" ? "{type_player}" : 0) as number;
	static NAME_PLAYER = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static DISPLAY_SIZE_INCH = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static DISPLAY_BRAND = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static DISPLAY_MODEL = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static VIEWPORT_WIDTH = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static VIEWPORT_HEIGHT = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static LATITUDE_PLAYER = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static LONGITUDE_PLAYER = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static LOCATION_CONTINENT = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static LOCATION_DISTRICT = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static LOCATION_COUNTRY = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static LOCATION_STAGE = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static LOCATION_CITY = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static LOCATION_POSTALCODE = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static LOCATION_BUILDING = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static ID_BUILDING = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static ACCOUNT_REF = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static ACCOUNT_KEY = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static PATH_CONTENT = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static DATE_GENERATE = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static URL_JSIGNAGE = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static URL_GPSIGNAGE = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static URL_ANIMATE = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static URL_JQUERY = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static URL_JQUERY_NEW = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static URL_SOCKETIO = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static URL_JCOMMON = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static URL_XML2JSON = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static KEY_MEDIA = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static ROOT_FOLDER = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static IP_PLAYER = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static PREVIEW = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static LOOP = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static DUR = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static URL_NOTIFICATION_RSS = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static URL_NOTIFICATION_JSON = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static KEEP_WIDGET_RATIO = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static COLOR_BACKGROUND = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static ID_MEDIA_BACKGROUND = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static BACKGROUND_IMAGE = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static PREVIEW_MEDIA = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static URL_VARIABLE = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static BG_COLOR = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;
	static LAYER = (process.env.NODE_ENV === "production" ? "{player_key}" : "") as string;

	static C_ORIENTATION(): ORIENTATION {
		if (this.HEIGHT > this.WIDTH) {
			return ORIENTATION.VERTICAL;
		} else {
			return ORIENTATION.HORIZONTAL;
		}
	}

	static C_RATIO(): RATIO {
		const ratio = Math.trunc((this.WIDTH / this.HEIGHT) * 100) / 100;

		switch (ratio) {
			case 3.55:
				return RATIO.H32_9;
			case 1.56:
				return RATIO.H14_9;
			case 1.77:
				return RATIO.H16_9;
			case 0.56:
				return RATIO.V9_16;
			default:
				console.log("new ratio: " + ratio + " original full ration: " + this.WIDTH / this.HEIGHT);

				return RATIO.H16_9;
		}
	}
}
