const router = require('express').Router();
const { User } = require('../../db/models');
// компоненты

// маршрутизация главной страницы
router.route('/').get(async (req, res) => {});

router.route('/logout').get((req, res, next) => {
	// получение пользователя из сессии
	const { userId } = req.session;

	if (userId) {
		try {
			// удаление сессии на сервере
			req.session.destroy();

			// серверное удаление куки по имени
			res.clearCookie('user_uid');

			// редирект на корень
			res.redirect('/');
		} catch (error) {
			console.log(error);
		}
	} else {
		res.redirect('/login');
	}
});

module.exports = router;
