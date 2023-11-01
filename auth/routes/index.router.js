const router = require('express').Router();
const UserRoutes = require('./api/user.routes');

router.use('/api/user/', UserRoutes);

module.exports = router;