import "../styles/Media.scss";

import mime from "mime";

import useHtml from "../hooks/useHtml";

interface IMediaProps {
	UUID: string;
	url: string;
	emptyUrlError: string;
	top: number;
	bottom: number;
	left: number;
	right: number;
	zIndex?: number;
	muted: boolean;
	width?: number;
	height?: number;
}

function Media(props: IMediaProps): JSX.Element {
	if (props.url == "") {
		return <p>{props.emptyUrlError}</p>;
	}

	const type = mime.getType(props.url) as string;
	const extension = props.url.split(".").pop();

	let container = document.getElementById(props.UUID);

	if (container == null) {
		const temp = document.createElement("div");
		temp.setAttribute("id", props.UUID);

		document.getElementById("root")?.appendChild(temp);

		container = document.getElementById(props.UUID);
	}

	if (container != null) {
		container.classList.add("media");
		container.innerHTML = "";

		switch (type) {
			case "text/html":
				if (extension == "htm") {
					const request = new XMLHttpRequest();
					request.open("GET", props.url, false);
					request.send(null);

					useHtml(request.response, container);
				} else {
					container.innerHTML = `<iframe src="${props.url}"></iframe>`;
				}

				break;
			case "application/javascript":
				useHtml(`<script src="${props.url}"></script>`, container);

				break;
			case "video/mp4":
				container.innerHTML = `<video src="${props.url}" autoPlay ${props.muted ? "muted" : ""} loop></video>`;

				break;
			case "image/gif":
			case "image/png":
			case "image/jpeg":
				container.innerHTML = `<img src="${props.url}" />`;

				break;
			default:
				container.innerHTML = `<p>Type: "${type}" isn't supported, media error.</p>`;

				break;
		}
	}
	const width = props.width ? props.width : 100 - (props.left + props.right);
	const height = props.height ? props.height : 100 - (props.top + props.bottom);

	return <style>
		{`
			.media {
				position: absolute;
				top: ${props.top}%;
				bottom: ${props.bottom}%;
				left: ${props.left}%;
				right: ${props.right}%;
				z-index: ${props.zIndex ? props.zIndex : 0};
				width: ${width}%;
				height: ${height}%;
			}
		`}
	</style>;
}

export default Media;
