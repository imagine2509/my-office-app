const router = require('express').Router();
const { Office } = require('../../db/models');

router.route('/office').get((req, res) => {
	console.log('в ручке');
	Office.findAll({ raw: true })
		.then((allOffices) => res.json(allOffices))
		.catch((error) => res.status(500).json({ error: error.message }));
});

router
	.route('/office/:id')
	.get((req, res) => {
		const { id } = req.params;
		Office.findOne({ where: { id } })
			.then((office) => res.json(office))
			.catch((error) => res.status(500).json({ error: error.message }));
	})
	.delete((req, res) => {
		const { id } = req.params;
		Office.destroy({ where: { id } })
			.then((deletedOffice) =>
				deletedOffice ? res.json(id) : res.status(404).json(deletedOffice)
			)
			.catch((error) => res.status(500).json({ error: error.message }));
	});

router.route('/office')
	.post((req, res) => {
		const { name , address } = req.body;
		Office.create({ name , address})
			.then((newOffice) =>
				newOffice ? res.status(200).json({id:newOffice.id,name:newOffice.name,address:newOffice.address}) : res.status(409).json({message:`failed to create new office with name=${name} and address=${address}`}) //409 conflict
			)
			.catch((error) => res.status(500).json({ error: error.message }));
	})

module.exports = router;