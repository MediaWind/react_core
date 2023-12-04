import { CSSProperties, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/fr";
import "dayjs/locale/en";
import "dayjs/locale/nl";

export interface IDateTimeStyle {
	format?: string;

	fontFamily?: string;
	fontSize?: string;
	textAlign?: "center" | "left" | "right";
	color?: string;

	bgColor?: string;
	borderRadius?: string;

	margin?: string;
	marginTop?: string;
	marginBottom?: string;
	marginLeft?: string;
	marginRight?: string;

	padding?: string;
	paddingTop?: string;
	paddingBottom?: string;
	paddingLeft?: string;
	paddingRight?: string;
}

export enum ORDER {
	DATE_TIME,
	TIME_DATE
}

export enum LOCALE {
	FR = "fr",
	EN = "en",
	NL = "nl",
}

interface IDateTimeProps {
	className?: string;
	date?: IDateTimeStyle
	time?: IDateTimeStyle
	oneLineDisplay?: boolean
	order?: ORDER
	locale?: LOCALE
}

export default function DateTime(props: IDateTimeProps): JSX.Element {
	const { className, date, time, oneLineDisplay, order, locale, } = props;
	const [dateTime, setDateTime] = useState<Dayjs>(dayjs());

	const [dateStyle, setDateStyle] = useState<CSSProperties | undefined>();
	const [timeStyle, setTimeStyle] = useState<CSSProperties | undefined>();

	dayjs.locale(locale ? locale : "fr");

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
				fontFamily: date.fontFamily,
				fontSize: date.fontSize,
				color: date.color,
				textAlign: date.textAlign ?? "center",

				backgroundColor: date.bgColor,
				borderRadius: date.borderRadius,

				margin: date.margin,
				marginTop: date.marginTop,
				marginBottom: date.marginBottom,
				marginLeft: date.marginLeft,
				marginRight: date.marginRight,

				padding: date.padding,
				paddingTop: date.paddingTop,
				paddingBottom: date.paddingBottom,
				paddingLeft: date.paddingLeft,
				paddingRight: date.paddingRight,
			});
		}

		if (time) {
			setTimeStyle({
				fontFamily: time.fontFamily,
				fontSize: time.fontSize,
				color: time.color,
				textAlign: time.textAlign ?? "center",

				backgroundColor: time.bgColor,
				borderRadius: time.borderRadius,

				margin: time.margin,
				marginTop: time.marginTop,
				marginBottom: time.marginBottom,
				marginLeft: time.marginLeft,
				marginRight: time.marginRight,

				padding: time.padding,
				paddingTop: time.paddingTop,
				paddingBottom: time.paddingBottom,
				paddingLeft: time.paddingLeft,
				paddingRight: time.paddingRight,
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
