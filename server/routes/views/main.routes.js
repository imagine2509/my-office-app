const router = require('express').Router();
const { User } = require('../../db/models');
// компоненты

// маршрутизация главной страницы
router.route('/').get(async (req, res) => {});

router.route('/logout').get((req, res, next) => {});

module.exports = router;
