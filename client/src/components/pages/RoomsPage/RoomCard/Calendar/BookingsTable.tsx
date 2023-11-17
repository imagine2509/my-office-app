import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@mui/material';
import { useAppSelector } from '../../../../../hooks/redux';

import styles from './calendar.styles.module.scss';

type RowData = {
	id: number;
	startTime: Date;
	endTime: Date;
};

const BookingsTable = (): JSX.Element => {
	const bookingsList = useAppSelector((state) => state.bookings.bookings);

	function createData(id: number, startTime: Date, endTime: Date): RowData {
		return { id, startTime, endTime };
	}
	const rows: RowData[] = [];
	bookingsList.forEach((element) => {
		const startTime = new Date(element.startTime);
		const endTime = new Date(element.endTime);
		if (!isNaN(startTime.getTime()) && !isNaN(endTime.getTime())) {
			rows.push(createData(element.id, startTime, endTime));
		}
	});

	return (
		<TableContainer component={Paper} className={styles.bookingsTableContainer}>
			<Table aria-label="Забронированные промежутки">
				<TableHead>
					<TableRow>
						<TableCell>Время начала</TableCell>
						<TableCell align="right">Время окончания</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow
							key={row.id}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{row.startTime.toLocaleTimeString()}
							</TableCell>
							<TableCell align="right">
								{row.endTime.toLocaleTimeString()}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default BookingsTable;
