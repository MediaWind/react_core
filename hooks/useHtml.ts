import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const useHtml = (text: string, parent?: HTMLElement) => {
	useEffect(() => {
		const createdElement = [] as string[];

		const parser = new DOMParser();
		const htmlDoc = parser.parseFromString(text, "text/html");

		const headElements = htmlDoc.getElementsByTagName("head")[0].children;
		const bodyElements = htmlDoc.getElementsByTagName("body")[0].children;

		const elements = [];
		elements.push(...headElements);
		elements.push(...bodyElements);

		for (let i = 0; i < elements.length; i++) {
			let element;
			let url;
			let content;
			const UUID = uuidv4();

			switch (elements[i].localName) {
				case "script":
					element = document.createElement("script");
					url = elements[i].attributes.getNamedItem("src")?.value as string;
					content = elements[i].innerHTML;

					if (url != undefined) {
						element.src = url;
					}

					if (content != "") {
						element.innerHTML = content;
					}

					element.id = UUID;

					if (parent != undefined) {
						parent.appendChild(element);
					} else {
						document.body.appendChild(element);
					}

					createdElement.push(UUID);
					break;
				default:
					elements[i].id = UUID;

					if (parent != undefined) {
						parent.appendChild(elements[i]);
					} else {
						document.body.appendChild(elements[i]);
					}

					createdElement.push(UUID);
					break;
			}
		}

		return () => {
			createdElement.forEach((UUID) => {
				document.getElementById(UUID)?.remove();
			});
		};
	}, [text, parent]);
};

export default useHtml;
