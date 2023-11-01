const router = require('express').Router();
const ActivationRoute = require('./api/user/user.activation.route');
const LoginRoute = require('./api/user/user.login.route');
const LogoutRoute = require('./api/user/user.logout.route');
const RegisterRoute = require('./api/user/user.register.route');
const RefreshRoute = require('./api/user/user.tokenRefresh.route');

router.use('/api/user/activation', ActivationRoute);
router.use('/api/user/login', LoginRoute);
router.use('/api/user/logout', LogoutRoute);
router.use('/api/user/register', RegisterRoute);
router.use('/api/user/refresh', RefreshRoute);

module.exports = router;