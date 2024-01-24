import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/fr";
import "dayjs/locale/en";
import "dayjs/locale/nl";

import { setIntervalSync } from "../customInterval";

interface IDateTimeProps {
	format: string
	className?: string;
	locale?: "fr" | "en" | "nl"
}

export default function DateTime(props: IDateTimeProps): JSX.Element {
	const { format, className, locale, } = props;
	const [dateTime, setDateTime] = useState<Dayjs>(dayjs());

	dayjs.locale(locale ? locale : "fr");

	useEffect(() => {
		setIntervalSync(() => {
			setDateTime(dayjs());
		}, 60 * 1000);
	}, []);

	return (
		<div className={className ?? ""}>
			<p>{dateTime.format(format)}</p>
		</div>
	);
}
