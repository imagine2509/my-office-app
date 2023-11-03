const router = require('express').Router();
const { User } = require('../../db/models');

// компоненты

router.route('/').get((req, res) => {});

router.route('/:id').get(async (req, res) => {});

module.exports = router;
