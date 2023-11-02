const router = require('express').Router();
const ActivationRoute = require('./api/user/user.activation.route');
const LoginRoute = require('./api/user/user.login.route');
const LogoutRoute = require('./api/user/user.logout.route');
const RegisterRoute = require('./api/user/user.register.route');
const RefreshRoute = require('./api/user/user.tokenRefresh.route');
const GetAllRoute = require('./api/user/user.getAll.route');


router.use('/api/user/', ActivationRoute);
router.use('/api/user/', LoginRoute);
router.use('/api/user/', LogoutRoute);
router.use('/api/user/', RegisterRoute);
router.use('/api/user/', RefreshRoute);
router.use('/api/user/', GetAllRoute);

module.exports = router;