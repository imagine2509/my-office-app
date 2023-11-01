const router = require('express').Router();
const { User } = require('../../db/models');

// компоненты

router.route('/').get((req, res) => {});

router.route('/:id').get(async (req, res) => {
	const { id } = req.params;
	const user = await User.findByPk(id);
	if (Number(id) === req.session.userId) {
		console.log(typeof id, typeof req.session.userId);
	} else {
		res.redirect('/login');
	}
});

module.exports = router;
