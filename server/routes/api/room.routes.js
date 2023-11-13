/* eslint-disable max-len */
/* eslint-disable linebreak-style */
const router = require('express').Router();
const { Room } = require('../../db/models');

router
	.route('/:id')
	.get((req, res) => {
		const { id } = req.params;
		Room.findOne({ where: { id } })
			.then((room) => res.json(room))
			.catch((error) => res.status(500).json({ error: error.message }));
	})
	.delete((req, res) => {
		const { id } = req.params;
		Room.destroy({ where: { id } })
			.then((deletedRoom) =>
				deletedRoom ? res.json(id) : res.status(404).json(deletedRoom)
			)
			.catch((error) => res.status(500).json({ error: error.message }));
	})
	.put((req, res) => {
		const { id } = req.params;
		Room.update(req.body, { where: { id } })
			.then((updatedRoom) =>
				updatedRoom ? res.json(updatedRoom) : res.status(404).json(updatedRoom)
			)
			.catch((error) => res.status(500).json({ error: error.message }));
	});

router
	.route('/')
	.get(async (req, res) => {
		try {
			const result = await Room.findAll();
			res.json(result);
		} catch (error) {
			console.log(error.message);
		}
	})
	.post((req, res) => {
		const { name, amount, officeId, video, description, photo } = req.body;
		Room.create({
			name,
			amount,
			officeId,
			video,
			description,
			photo,
		})
			.then(
				(newRoom) =>
					newRoom
						? res.status(200).json({
								id: newRoom.id,
								name: newRoom.name,
								description: newRoom.description,
						  })
						: res.status(409).json({
								message: `failed to create new room with name=${name}`,
						  }) // 409 conflict
			)
			.catch((error) => res.status(500).json({ error: error.message }));
	});

module.exports = router;
