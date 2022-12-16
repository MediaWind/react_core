// Code from https://www.kitedevice.com/

/**
* Communication protocol for KiteDevice Client
* Every platform is defined on its own interface
* These implementations are available on the WebView
*/

import EventEmitter from "events";
import type TypedEmitter from "typed-emitter";
import {Base64} from "js-base64";

/// Each platform is able and must define window._kitedevice_internal
const _kitedevice = (window as any)._kitedevice_internal;

export class KiteClient {
	/**
	* Reboot the device.
	* Throws an error if the OS didn't give us the permission
	*/
	reboot(): void {
		_kitedevice.call("reboot");
	}

	// Enable/Disable device screen
	setBacklightStatus(status: boolean): void {
		_kitedevice.call("setBacklightStatus", {status: status,});
	}

	/**
	* Android Only
	* Disable Kiosk Mode
	*/
	setKioskMode(status: boolean): void {
		_kitedevice.call("setKioskMode", {status: status,});
	}

	/**
	 * Android Only
	 * Temporarily lock the device
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	lock(status: boolean): void {
		_kitedevice.call("lock");
	}

	/**
	 * Android Only
	 * Temporarily unlock the device
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	unlock(status: boolean): void {
		_kitedevice.call("unlock");
	}

	/**
	 * Android Only
	 * Exit the app
	 */
	exit(): void {
		_kitedevice.call("exit");
	}

	/**
	* Android Only
	* Zebra Enterprise Mobility Development Kit
	*/
	getEMDK(): EMDK {
		return EMDK.getInstance();
	}

	/**
	* Android Only
	* ProDVX Surround Led Bar
	*/
	getSurroundLED(): SurroundLed {
		return SurroundLed.getInstance();
	}
}

export enum EMDKEvent {
	DataScanned = "data_scanned",
}

interface ScanData {
	/**
	* Binary data
	*/
	data: Uint8Array;
	/**
	* Type of ScannedData: QR, Barcode, ..
	*/
	label_type: string;
}

type EMDKCallbacks = {
	data_scanned: (data: ScanData) => void
}

class EMDK extends (EventEmitter as new () => TypedEmitter<EMDKCallbacks>) {
	private static instance: EMDK;

	private constructor() {
		super();

		interface InternalData {
			data: string;
			label_type: string;
			timestamp: string;
		}

		/// Subscribe to the Native Emitter
		_kitedevice.addListener("emdk_data_scanned", (data: InternalData) => {
			this.emit(EMDKEvent.DataScanned, {
				data: Base64.toUint8Array(data.data),
				label_type: data.label_type,
			});
		});
	}

	public static getInstance(): EMDK {
		if (!EMDK.instance)
			EMDK.instance = new EMDK();

		return EMDK.instance;
	}
}

export interface LedData {
	r: number,
	g: number,
	b: number,
}

class SurroundLed {
	private static instance: SurroundLed;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	private constructor() {}

	/**
	* Update the Surround Led Bar of ProDVX.
	* The array musts contains 52 elements ( = nb. of leds )
	*/
	setLeds(leds: LedData[]): void {
		_kitedevice.call("setSurroundLeds", leds);
	}

	public static getInstance(): SurroundLed {
		if (!SurroundLed.instance)
			SurroundLed.instance = new SurroundLed();

		return SurroundLed.instance;
	}
}
