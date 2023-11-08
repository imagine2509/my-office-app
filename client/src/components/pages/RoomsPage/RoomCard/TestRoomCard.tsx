import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

type Booking = {
	id: number | string;
	startTime: string;
	endTime: string;
};

function TestRoomCard() {
	const [booking, setBookings] = useState<Booking[]>([]);
	const { id } = useParams();

	useEffect(() => {
		const fetchBookings = async () => {
			const allBookings = await fetch(`http://localhost:3002/api/room/${id}`);
			const res = await allBookings.json();
			console.log(res);
			setBookings(res);
		};
		fetchBookings();
	}, []);
	return (
		<div>
			<div>Все брони для комнаты с ID:{id}</div>
			{booking.map((date, insex) => {
				console.log(date.startTime.split('T')[1]);
				console.log(format(new Date(Date.parse(date.startTime)), 'HH-mm'));
				// const x = format(date);
				return (
					<div key={insex}>
						<div>
							<span>
								Дата брони:{' '}
								{date.startTime.split('T')[0].split('-').reverse().join('.')}
							</span>
							<span>
								Время брони с{' '}
								{format(new Date(Date.parse(date.startTime)), 'HH-mm')}
							</span>
							<span>
								{' '}
								до {format(new Date(Date.parse(date.endTime)), 'HH-mm')}
							</span>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default TestRoomCard;
