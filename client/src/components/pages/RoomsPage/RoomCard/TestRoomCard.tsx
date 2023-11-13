import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

type Booking = {
	id: number | string;
	startTime: Date;
	endTime: Date;
};

const localizer = momentLocalizer(moment);

function TestRoomCard() {
	console.log('checks');

	const [booking, setBookings] = useState<Booking[]>([
		{
			startTime: new Date(),
			endTime: new Date(),
			id: 0,
		},
	]);
	const { id } = useParams();

	useEffect(() => {
		const fetchBookings = async () => {
			const allBookings = await fetch(`http://localhost:3002/api/room/${id}`);
			const res = await allBookings.json();
			const result = res.map((el: Booking) => {
				console.log(el);

				el.endTime = new Date(el.endTime);
				el.startTime = new Date(el.startTime);
				return el;
			});
			setBookings(result);
		};
		fetchBookings();
	}, []);
	return (
		<div>
			<div>Все брони для комнаты с ID:{id}</div>
			{booking.map((date, index) => {
				return (
					<div key={index}>
						<div>
							<span>
								Дата брони: {format(new Date(date.startTime), 'MM-dd')}
							</span>
							<span>
								Время брони с {format(new Date(date.startTime), 'HH-mm')}
							</span>
							<span> до {format(new Date(date.endTime), 'HH-mm')}</span>
						</div>
					</div>
				);
			})}
			<div>
				<Calendar
					localizer={localizer}
					defaultDate={new Date()}
					events={booking}
					startAccessor="startTime"
					endAccessor="endTime"
					style={{ height: 350, width: 700 }}
				/>
			</div>
		</div>
	);
}

export default TestRoomCard;
