const router = require('express').Router();
const { Office } = require('../../db/models');

router.route('/offices').get((req, res) => {
	Office.findAll({ raw: true })
		.then((allUsers) => res.json(allUsers))
		.catch((error) => res.status(500).json({ error: error.message }));
});

router
	.route('/office/:id')
	.get((req, res) => {
		const { id } = req.params.id;
		Office.findOne({ where: { id } })
			.then((user) => res.json(user))
			.catch((error) => res.status(500).json({ error: error.message }));
	})
	.delete((req, res) => {
		const { id } = req.params;
		User.destroy({ where: { id } })
			.then((deletedOffice) =>
				deletedOffice ? res.json(id) : res.status(404).json(deletedOffice)
			)
			.catch((error) => res.status(500).json({ error: error.message }));
	});
