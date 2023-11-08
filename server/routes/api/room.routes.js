const router = require('express').Router();
import { format } from 'date-fns';
const { UserRoom } = require('../../db/models');

router.route('/room/:id').get(async (req, res) => {
	const currentTime = format(new Date(), 'yyyy-MM-dd');
	try {
		const { id } = req.params;
		const booking = await UserRoom.findAll({
			where: { roomId: id },
			raw: true,
		});
		const filteredData = booking.filter((data) => {
			if (format(data.startTime, 'yyyy-MM-dd') >= currentTime) {
				return data;
			}
		});
		console.log(filteredData);
		res.json(filteredData);
	} catch (error) {
		console.log(error.message);
	}
});
module.exports = router;
