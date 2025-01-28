import "../styles/Media.scss";

import mime from "mime";

import useHtml from "../hooks/useHtml";

import { useEffect } from "react";

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
	domain?: string;
}

function Media(props: IMediaProps): JSX.Element {

	// @ts-ignore
	const refInterval10 = useRef ();

	// @ts-ignore
	const refInterval30 = useRef ();

	useEffect(() => {	
		// Remove media element if they are generated outside the classic flow
		return () => {
			const element = document.getElementById(props.UUID);
			if (element) {
				element.remove();
			}

			clearInterval(refInterval10.current);
			clearInterval(refInterval30.current);
		};
	},[]);

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
		container.style.position = "absolute";
		container.style.top = `${props.top}%`;
		container.style.bottom = `${props.bottom}%`;
		container.style.left = `${props.left}%`;
		container.style.right = `${props.right}%`;
		container.style.zIndex = `${props.zIndex ? props.zIndex : 0}`;
		container.style.width = `${props.width ? props.width : 100 - (props.left + props.right)}%`;
		container.style.height = `${props.height ? props.height : 100 - (props.top + props.bottom)}%`;

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
			case "video/quicktime":
				clearInterval(refInterval10.current);
				clearInterval(refInterval30.current);

				container.innerHTML = `<video src="${props.url}" autoPlay ${props.muted ? "muted" : ""} loop></video>`;

				if (props.url.includes("http") ) {
					const videoHtml = container.getElementsByTagName("video")[0];
					const init = videoHtml.getAttribute("init") ?? "";

					if (init != "1") {
						videoHtml.setAttribute("init", "1");

						if (props.domain && document.body.contains(videoHtml)) {
							let lastEnd = 0;
							const randomId = Math.floor(Math.random() * 100);

							// @ts-ignore
							refInterval10.current = setInterval(function(){
								if (!videoHtml.paused) {
									console.log("randomId", randomId);
									const lastEndNow = videoHtml.currentTime;
									if (lastEndNow == lastEnd) {
										console.log("Video blocked at " + lastEnd + " on " + videoHtml.duration);
										lastEnd = loadVideo(videoHtml, 0, 0);
									} else {
										lastEnd = lastEndNow;
									}
								}
							}, 10000);

							// @ts-ignore
							refInterval30.current = setInterval(function(){
								const xhr = new XMLHttpRequest();
								xhr.open("GET", props.domain + "/services/ping/index.php");
								xhr.onload = function() {
									if (xhr.status === 200) {
										if (videoHtml.paused) {
											console.log("Online");
											lastEnd = loadVideo(videoHtml, lastEnd, 0);
										}
									} else {
										if (!videoHtml.paused) {
											console.log("Offline. Video on pause");
											videoHtml.pause();
										}
									}
								};
								xhr.send();
							}, 30000);

						} else {
							window.addEventListener("offline", () => {
								videoHtml.pause();
							});
							window.addEventListener("online", () => {
								videoHtml.play();
							});
						}
					}
				}

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

	function loadVideo(videoHtml: any, lastEnd: number, nbTry: number):number {
		console.log("Load video");
		videoHtml.oncanplaythrough  = function() {
			videoHtml.play();
		};
		videoHtml.onplay = function(){
			const duration = videoHtml.duration;
			if (isNaN(lastEnd)) {
				lastEnd = 0;
			}
			if (lastEnd >= duration) {
				lastEnd = 0;
			}
			videoHtml.currentTime = lastEnd;
			videoHtml.onerror = undefined;
		};
		videoHtml.onerror = function() {
			if (nbTry < 5) {
				nbTry++;
				lastEnd = loadVideo(videoHtml, lastEnd, nbTry);
			}
		};
		videoHtml.load();
		return lastEnd;
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
