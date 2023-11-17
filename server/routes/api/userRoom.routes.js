const router = require('express').Router();
const { UserRoom } = require('../../db/models');

router.route('/').get((req, res) => {
	UserRoom.findAll({ raw: true })
		.then((allUserRoom) => res.json(allUserRoom))
		.catch((error) => res.status(500).json({ error: error.message }));
});

router
	.route('/:roomId')
	.post((req, res) => {
		try {
			const { startTime, endTime } = req.body;
			const { roomId } = req.params;
			// const { userId } = res.localStorage.getItem;
			UserRoom.create({ startTime, endTime, roomId })
				.then(
					(newUserRoom) =>
						newUserRoom
							? res.status(200).json({
									id: newUserRoom.id,
									startTime: newUserRoom.startTime,
									endTime: newUserRoom.endTime,
							  })
							: res.status(409).json({
									message: `failed to book room`,
							  }) // 409 conflict
				)
				.catch((error) => res.status(500).json({ error: error.message }));
		} catch (error) {
			console.log(error.message);
		}
	})
	.get((req, res) => {
		const { roomId } = req.params;
		UserRoom.findAll({ where: { roomId }, raw: true })
			.then((allUserRoom) => res.json(allUserRoom))
			.catch((error) => res.status(500).json({ error: error.message }));
	})
	.delete(async (req, res) => {
		try {
			const { roomId } = req.params;
			const response = await UserRoom.destroy({ where: { id: roomId } });
			if (response) {
				res.sendStatus(200);
			}
		} catch ({ message }) {
			res.status(500).json({ message });
		}
	});

module.exports = router;
