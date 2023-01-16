import { KiteClient, LedData } from "./client";

export class ProDVX {
	private static hasBeenInitialized = false;
	private static kiteDevice: KiteClient;

	private static ledHistory: LedData[] = [];

	private static init() {
		try {
			if (!ProDVX.hasBeenInitialized) {
				console.log("KiteDevice initialized");

				ProDVX.hasBeenInitialized = true;

				ProDVX.kiteDevice = new KiteClient();

				for (let i = 0; i < 52; i++) {
					ProDVX.ledHistory.push({
						r: 0,
						g: 0,
						b: 0,
					});
				}
			}
		} catch (error) {
			console.error("ProDVX error, maybe the player isn't a ProDVX ?");
		}
	}

	public static setAllSame(color: LedData) {
		try {
			ProDVX.init();

			const led = [] as LedData[];

			for (let i = 0; i < 52; i++) {
				led.push(color);
			}

			ProDVX.kiteDevice.getSurroundLED().setLeds(led);
			ProDVX.ledHistory = led;
		} catch (error) {
			console.error("ProDVX error, maybe the player isn't a ProDVX ?");
		}
	}

	public static setAll(colors: LedData[]) {
		try {
			ProDVX.init();

			ProDVX.kiteDevice.getSurroundLED().setLeds(colors);
			ProDVX.ledHistory = colors;
		} catch (error) {
			console.error("ProDVX error, maybe the player isn't a ProDVX ?");
		}
	}

	public static setOne(index: number, color: LedData) {
		try {
			ProDVX.init();

			ProDVX.ledHistory[index] = color;
			ProDVX.kiteDevice.getSurroundLED().setLeds(ProDVX.ledHistory);
		} catch (error) {
			console.error("ProDVX error, maybe the player isn't a ProDVX ?");
		}
	}

	// TODO this will be needed fot the meeting widget
	// public static setProgress(progress: number, filledColor: LedData, toFillColor: LedData) {
	// ProDVX.init();

	// const normalizedLedOrder = [] as number[];
	// for (let i = 0; i < 52; i++) {
	// 	normalizedLedOrder.push(i);
	// }
	// normalizedLedOrder.reverse();

	// this.setAllSame(toFillColor);

	// this.setOne(normalizedLedOrder[0], filledColor);
	// this.setOne(normalizedLedOrder[10], filledColor);
	// }
}
