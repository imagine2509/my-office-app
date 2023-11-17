import { Box, Button } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import { addBooking } from '../../../../../store/reducers/BookingSlice';

import styles from './calendar.styles.module.scss';

const TimePickers = () => {
	const [startTime, setStartTime] = useState<Date>();
	const [endTime, setEndTime] = useState<Date>();
	const { id } = useParams();
	const userId = useAppSelector((state) => state.users.user.id);
	const currentDate = useAppSelector((state) => state.dates.date.$d);
	const dispatch = useAppDispatch();

	const transformDate = (notToday: Date): Date | undefined => {
		if (notToday && currentDate) {
			let cCurrentDate = new Date(currentDate.toString());
			const resStart = new Date(
				notToday
					.toString()
					.split(' ')
					.map((el, i) => {
						if (i === 2) {
							el = cCurrentDate.toString().split(' ')[2];
							return el;
						}
						return el;
					})
					.join(' ')
			);
			console.log(resStart);

			return resStart;
		}
	};

	const handleSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		event.preventDefault();

		try {
			const data = { startTime, endTime, id, userId };
			console.log(data);
			const res = await fetch(`http://localhost:3002/api/userroom/${id}`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			const booking = await res.json();
			if (res.ok) {
				dispatch(addBooking(booking));
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Box
				component="form"
				onSubmit={handleSubmit}
				noValidate
				className={styles.timePickersContainer}
			>
				<TimePicker
					ampm={false}
					label="Start Time"
					onAccept={(value) => setStartTime(transformDate(value.$d))}
					onChange={(value) => setStartTime(transformDate(value.$d))}
				/>
				<TimePicker
					ampm={false}
					label="End Time"
					onAccept={(value) => setEndTime(transformDate(value.$d))}
					onChange={(value) => setEndTime(transformDate(value.$d))}
				/>
				<Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
					Забронировать
				</Button>
			</Box>
		</>
	);
};

export default TimePickers;
