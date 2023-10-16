import parseBoolean from "./utils/parseBoolean";

export enum ORIENTATION {
	VERTICAL = "vertical",
	HORIZONTAL = "horizontal",
}

export enum RATIO {
	V9_16 = "9:16",
	H16_9 = "16:9",
	H32_9 = "32:9",
	H14_9 = "14:9",
	H16_10 = "16:10",
	V10_16 = "10:16",
	H5_4 = "5:4"
}

export class DefaultVariables {
	static ID_MEDIA = (process.env.NODE_ENV === "production" ? parseInt("{id_media}") : 0) as number;
	static WIDTH = (process.env.NODE_ENV === "production" ? parseInt("{width}") : parseInt(process.env.REACT_APP_WIDTH ?? "1920")) as number;
	static HEIGHT = (process.env.NODE_ENV === "production" ? parseInt("{height}") : parseInt(process.env.REACT_APP_HEIGHT ?? "1080")) as number;
	static MODE_LAYOUT = process.env.NODE_ENV === "production" ? "{mode_layout}" : "" as string;
	static ID_PLAYER = (process.env.NODE_ENV === "production" ? parseInt("{id_player}") : parseInt(process.env.REACT_APP_ID_PLAYER ?? "57")) as number;
	static SERIAL_PLAYER = (process.env.NODE_ENV === "production" ? "{serial_player}" : process.env.REACT_APP_SERIAL_PLAYER ?? "0001C02A7E18") as string;
	static SERIAL = (process.env.NODE_ENV === "production" ? "{serial}" : process.env.REACT_APP_SERIAL_PLAYER ?? "0001C02A7E18") as string;
	static KEY_PLAYER = (process.env.NODE_ENV === "production" ? "{key_player}" : process.env.REACT_APP_KEY_PLAYER ?? "ay3asIzHnxI0Q") as string;
	static PLAYER_KEY = (process.env.NODE_ENV === "production" ? "{player_key}" : process.env.REACT_APP_KEY_PLAYER ?? "ay3asIzHnxI0Q") as string;
	static PLAYER_TYPE = (process.env.NODE_ENV === "production" ? parseInt("{player_type}") : parseInt(process.env.REACT_APP_PLAYER_TYPE ?? "11")) as number;
	static PLAYER_TYPE_HW = (process.env.NODE_ENV === "production" ? parseInt("{player_type_hw}") : parseInt(process.env.REACT_APP_PLAYER_TYPE_HW ?? "28")) as number;
	static PLAYER_FAMILY = (process.env.NODE_ENV === "production" ? "{player_family}" : process.env. REACT_APP_PLAYER_FAMILY ?? "android") as string;
	static PLAYER_FIRMWARE = (process.env.NODE_ENV === "production" ? "{player_firmware}" : process.env.REACT_APP_PLAYER_FIRMWARE ?? "0.5.10") as string;
	static WIDGET_FOLDER = (process.env.NODE_ENV === "production" ? "{widget_folder}" : "/") as string;
	static DOMAINE = (process.env.NODE_ENV === "production" ? "{domaine}" : "modules.greenplayer.com") as string;
	static DOMAINE_HTTP = (process.env.NODE_ENV === "production" ? "{domaine_http}" : "https://modules.greenplayer.com") as string;
	static TYPE_PLAYER = (process.env.NODE_ENV === "production" ? parseInt("{type_player}") : 0) as number;
	static NAME_PLAYER = (process.env.NODE_ENV === "production" ? "{name_player}" : "Development Environment") as string;
	static DISPLAY_SIZE_INCH = (process.env.NODE_ENV === "production" ? parseFloat("{display_size_inch}") : 0.0) as number;
	static DISPLAY_BRAND = (process.env.NODE_ENV === "production" ? "{display_brand}" : "NodeJs") as string;
	static DISPLAY_MODEL = (process.env.NODE_ENV === "production" ? "{display_model}" : "ReactJs") as string;
	static VIEWPORT_WIDTH = (process.env.NODE_ENV === "production" ? parseInt("{viewport_width}") : parseInt(process.env.REACT_APP_VIEWPORT_WIDTH ?? "1920")) as number;
	static VIEWPORT_HEIGHT = (process.env.NODE_ENV === "production" ? parseInt("{viewport_height}") : parseInt(process.env.REACT_APP_VIEWPORT_HEIGHT ?? "1080")) as number;
	static LATITUDE_PLAYER = (process.env.NODE_ENV === "production" ? parseFloat("{latitude_player}") : parseFloat(process.env.REACT_APP_LATITUDE_PLAYER ?? "0.0")) as number;
	static LONGITUDE_PLAYER = (process.env.NODE_ENV === "production" ? parseFloat("{longitude_player}") : parseFloat(process.env.REACT_APP_LONGITUDE_PLAYER ?? "0.0")) as number;
	static LOCATION_CONTINENT = (process.env.NODE_ENV === "production" ? "{location_continent}" : "") as string;
	static LOCATION_DISTRICT = (process.env.NODE_ENV === "production" ? "{location_district}" : "") as string;
	static LOCATION_COUNTRY = (process.env.NODE_ENV === "production" ? "{location_country}" : "") as string;
	static LOCATION_STAGE = (process.env.NODE_ENV === "production" ? "{location_stage}" : "") as string;
	static LOCATION_CITY = (process.env.NODE_ENV === "production" ? "{location_city}" : "") as string;
	static LOCATION_POSTALCODE = (process.env.NODE_ENV === "production" ? "{location_postalcode}" : "") as string;
	static LOCATION_BUILDING = (process.env.NODE_ENV === "production" ? "{location_building}" : "") as string;
	static ID_BUILDING = (process.env.NODE_ENV === "production" ? parseInt("{id_building}") : 25) as number;
	static ACCOUNT_REF = (process.env.NODE_ENV === "production" ? "{account_ref}" : process.env.REACT_APP_ACCOUNT_REF ?? "greenp60") as string;
	static ACCOUNT_KEY = (process.env.NODE_ENV === "production" ? "{account_key}" : process.env.REACT_APP_ACCOUNT_KEY ?? "yxfhAvfIMDxCAxY") as string;
	static PATH_CONTENT = (process.env.NODE_ENV === "production" ? "{path_content}" : "/") as string;
	static DATE_GENERATE = (process.env.NODE_ENV === "production" ? "{date_generate}" : "") as string;
	static URL_JSIGNAGE = (process.env.NODE_ENV === "production" ? "{url_jsignage}" : "") as string;
	static URL_GPSIGNAGE = (process.env.NODE_ENV === "production" ? "{url_gpsignage}" : "") as string;
	static URL_ANIMATE = (process.env.NODE_ENV === "production" ? "{url_animate}" : "") as string;
	static URL_JQUERY = (process.env.NODE_ENV === "production" ? "{url_jquery}" : "") as string;
	static URL_JQUERY_NEW = (process.env.NODE_ENV === "production" ? "{url_jquery_new}" : "") as string;
	static URL_SOCKETIO = (process.env.NODE_ENV === "production" ? "{url_socketio}" : "") as string;
	static URL_JCOMMON = (process.env.NODE_ENV === "production" ? "{url_jcommon}" : "") as string;
	static URL_XML2JSON = (process.env.NODE_ENV === "production" ? "{url_xml2_json}" : "") as string;
	static KEY_MEDIA = (process.env.NODE_ENV === "production" ? "{key_media}" : "") as string;
	static ROOT_FOLDER = (process.env.NODE_ENV === "production" ? "{root_folder}" : "/") as string;
	static IP_PLAYER = (process.env.NODE_ENV === "production" ? "{ip_player}" : "127.0.0.1") as string;
	static PREVIEW = (process.env.NODE_ENV === "production" ? parseBoolean("{preview}") : true) as boolean;
	static LOOP = (process.env.NODE_ENV === "production" ? parseBoolean("{loop}") : "") as boolean;
	static DUR = (process.env.NODE_ENV === "production" ? "{dur}" : "") as string;
	static URL_NOTIFICATION_RSS = (process.env.NODE_ENV === "production" ? "{url_notification_rss}" : "") as string;
	static URL_NOTIFICATION_JSON = (process.env.NODE_ENV === "production" ? "{url_notification_json}" : "") as string;
	static KEEP_WIDGET_RATIO = (process.env.NODE_ENV === "production" ? parseBoolean("{keep_widget_ratio}") : "") as boolean;
	static PREVIEW_MEDIA = (process.env.NODE_ENV === "production" ? parseBoolean("{preview_media}") : false) as boolean;
	static URL_VARIABLE = (process.env.NODE_ENV === "production" ? "{url_variable}" : "") as string;
	static BG_COLOR = (process.env.NODE_ENV === "production" ? "{bg_color}" : "") as string;
	static LAYER = (process.env.NODE_ENV === "production" ? "{layer}" : "/") as string;

	static C_FULL_SCREEN(): boolean {
		console.log("full screen:", this.HEIGHT, this.VIEWPORT_HEIGHT, this.WIDTH, this.VIEWPORT_WIDTH, this.HEIGHT == this.VIEWPORT_HEIGHT, this.WIDTH == this.VIEWPORT_WIDTH, this.HEIGHT == this.VIEWPORT_HEIGHT && this.WIDTH == this.VIEWPORT_WIDTH);

		return this.HEIGHT == this.VIEWPORT_HEIGHT && this.WIDTH == this.VIEWPORT_WIDTH;
	}

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
			case 1.6:
				return RATIO.H16_10;
			case 1.77:
				return RATIO.H16_9;
			case 0.56:
				return RATIO.V9_16;
			case 0.62:
				return RATIO.V10_16;
			case 1.25:
				return RATIO.H5_4;
			default:
				console.log("new ratio: " + ratio + " original full ration: " + this.WIDTH / this.HEIGHT);

				return RATIO.H16_9;
		}
	}
}
