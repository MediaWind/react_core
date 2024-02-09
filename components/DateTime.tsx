import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale";

import { setIntervalSync } from "../customInterval";

interface IDateTimeProps {
	format: string
	className?: string;
	locale?: string
	updateInterval?: number
}

export default function DateTime(props: IDateTimeProps): JSX.Element {
	const { format, className, locale, updateInterval, } = props;
	const [dateTime, setDateTime] = useState<Dayjs>(dayjs());

	dayjs.locale(locale ? locale : "fr");

	useEffect(() => {
		setIntervalSync(() => {
			setDateTime(dayjs());
		}, (updateInterval ?? 60) * 1000);
	}, []);

	return (
		<div className={className ?? ""}>
			<p>{dateTime.format(format)}</p>
		</div>
	);
}
