import axios from "axios";

export default class Printer {
	public static async print(data: string) {
		const result = await axios.post("http://localhost:5000/?action&print", "base64=" + data);

		return result;
	}
}
