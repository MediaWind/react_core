import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale";

import { setIntervalSync } from "../customInterval";

interface IDateTimeProps {
	format: string
	className?: string
	divStyle?: React.CSSProperties
	textStyle?: React.CSSProperties
	locale?: string
	updateInterval?: number
}

export default function DateTime(props: IDateTimeProps): JSX.Element {
	const { format, className, divStyle, textStyle, locale, updateInterval, } = props;
	const [dateTime, setDateTime] = useState<Dayjs>(dayjs());

	dayjs.locale(locale ?? "fr");

	useEffect(() => {
		const delay = setIntervalSync(() => {
			setDateTime(dayjs());
		}, (updateInterval ?? 60) * 1000);

		return () => {
			clearInterval(delay);
		};
	}, []);

	useEffect(() => {
		dayjs.locale(locale ?? "fr");
		setDateTime(dayjs());
	}, [locale]);

	return (
		<div className={className ?? ""} style={divStyle}>
			<p style={textStyle}>{dateTime.format(format)}</p>
		</div>
	);
}
