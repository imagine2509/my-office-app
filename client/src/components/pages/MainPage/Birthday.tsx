import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks/redux';

type DatesOfBirth = {
	firstName: string;
	lastName: string;
	birthDate: string;
};

const Birthday = (): JSX.Element => {
	const [dates, setDates] = useState<DatesOfBirth[]>([]);
	const user = useAppSelector((state) => state.users.user);

	useEffect(() => {
		const fetchBirth = async () => {
			if (user.id) {
				const allBirthDate = await fetch(
					`http://localhost:3002/birth/${user.id}`
				);
				const result = await allBirthDate.json();
				setDates(result);
			}
		};
		fetchBirth();
	}, []);

	return (
		<div>
			Дни рождения коллег
			{dates ? (
				dates.map((date) => {
					return (
						<div>
							<span>Имя: {date.firstName} </span>
							<span>Фамилия: {date.lastName}</span>
							<div>Дата Рождения: {date.birthDate}</div>
						</div>
					);
				})
			) : (
				<div>Не вошёл</div>
			)}
		</div>
	);
};

export default Birthday;
