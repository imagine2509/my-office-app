import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import { getBookings } from '../../../../../store/reducers/BookingSlice';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import dayjs, { Dayjs } from 'dayjs';
import { setDate } from '../../../../../store/reducers/DateSlice';

const CalendarComponent = () => {
	const [value, setValue] = useState<Dayjs | null>(dayjs(new Date()));
	const { id } = useParams();
	const currentDate = useAppSelector((state) => state.dates);

	const dispatch = useAppDispatch();

	useEffect(() => {
		const fetchBookings = async () => {
			const allBookings = await fetch(
				`http://localhost:3002/api/userroom/${id}`
			);
			const res = await allBookings.json();
			const filterRes = res.filter((booking) => {
				if (value) {
					if (
						new Date(booking.startTime).getDate() ===
						new Date(value.$d).getDate()
					) {
						return booking;
					}
				}
			});

			dispatch(getBookings(filterRes));
		};
		fetchBookings();
	}, [value, dispatch, id]);

	return (
		<>
			<DateCalendar
				value={value}
				onChange={(newValue) => {
					dispatch(setDate(newValue));
					setValue(newValue);
				}}
			/>
		</>
	);
};

export default CalendarComponent;
