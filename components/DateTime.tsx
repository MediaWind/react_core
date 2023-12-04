import { CSSProperties, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

export interface IDateTimeStyle {
	format?: string;

	color?: string;
	fontSize?: string;
	bgColor?: string;
	borderRadius?: string;

	textAlign?: "center" | "left" | "right";

	margin?: string;
	marginTop?: string;
	marginBottom?: string;
	marginLeft?: string;
	marginRight?: string;
}

export enum ORDER {
	DATE_TIME,
	TIME_DATE
}

interface IDateTimeProps {
	className?: string;
	date?: IDateTimeStyle
	time?: IDateTimeStyle
	oneLineDisplay?: boolean
	order?: ORDER
}

export default function DateTime(props: IDateTimeProps): JSX.Element {
	const { className, date, time, oneLineDisplay, order, } = props;
	const [dateTime, setDateTime] = useState<Dayjs>(dayjs());

	const [dateStyle, setDateStyle] = useState<CSSProperties | undefined>();
	const [timeStyle, setTimeStyle] = useState<CSSProperties | undefined>();

	useEffect(() => {
		setDateTime(dayjs());

		setTimeout(() => {
			setInterval(() => {
				setDateTime(dayjs());
			}, 60 * 1000);
		}, (60 - dayjs().second()) * 1000);
	}, []);

	useEffect(() => {
		if (date) {
			setDateStyle({
				color: date.color,
				fontSize: date.fontSize,
				backgroundColor: date.bgColor,
				borderRadius: date.borderRadius,

				margin: date.margin,
				marginTop: date.marginTop,
				marginBottom: date.marginBottom,
				marginLeft: date.marginLeft,
				marginRight: date.marginRight,

				textAlign: date.textAlign ?? "center",
			});
		}

		if (time) {
			setTimeStyle({
				color: time.color,
				fontSize: time.fontSize,
				backgroundColor: time.bgColor,
				borderRadius: time.borderRadius,

				margin: time.margin,
				marginTop: time.marginTop,
				marginBottom: time.marginBottom,
				marginLeft: time.marginLeft,
				marginRight: time.marginRight,

				textAlign: time.textAlign ?? "center",
			});
		}
	}, [date, time]);

	if (oneLineDisplay) {
		if (order && order === ORDER.TIME_DATE) {
			return (
				<div className={className}>
					<p>
						{time ? <span style={timeStyle}>{dateTime.format(time.format)}</span> : ""}

						{date ? <span style={dateStyle}>{dateTime.format(date.format)}</span> : ""}
					</p>
				</div>
			);
		} else {
			return (
				<div className={className}>
					<p>
						{date ? <span style={dateStyle}>{dateTime.format(date.format)}</span> : ""}

						{time ? <span style={timeStyle}>{dateTime.format(time.format)}</span> : ""}
					</p>
				</div>
			);
		}
	}

	if (order && order === ORDER.TIME_DATE) {
		return (
			<div className={className}>
				{time ? <p style={timeStyle}>{dateTime.format(time.format)}</p> : ""}

				{date ? <p style={dateStyle}>{dateTime.format(date.format)}</p> : ""}
			</div>
		);
	} else {
		return (
			<div className={className}>
				{date ? <p style={dateStyle}>{dateTime.format(date.format)}</p> : ""}

				{time ? <p style={timeStyle}>{dateTime.format(time.format)}</p> : ""}
			</div>
		);
	}
}
