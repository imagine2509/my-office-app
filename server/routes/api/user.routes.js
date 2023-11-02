require('dotenv').config();
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../../auth/db/models');
const { Token } = require('../../../auth/db/models');
const sendEmail = require('../../../auth/sendEmail');
const { body, validationResult } = require('express-validator');
const authCheck = require('../../middleware/authCheck');

router.post(
	'/register',
	body('email').isEmail(),
	body('password').isLength({ min: 6 }),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res
				.status(422)
				.json({ message: `Недопустимые данные`, errors: errors.array() }); //422 Unprocessable entity
			return;
		}
		const { email, password } = req.body;
		try {
			const userExists = await User.findOne({ where: { email } });
			if (userExists) {
				res.status(409).json({
					//409 Conflict
					message: `email = ${email} уже занят`,
				});
				return;
			}
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			let activationString = await bcrypt.hash(email, salt);
			activationString = activationString.replace(/[^a-zA-Z0-9]+/g, '');
			const newuser = await User.create({
				email,
				password: hashedPassword,
				activationString,
			});
			sendEmail(
				email,
				(subject = 'Активация нового пользователя'),
				(header = 'Reservations:'),
				(text = 'Для активации перейдите по ссылке'),
				(link = `${process.env.API_URL}:${process.env.API_PORT}/api/user/activate/${activationString}`)
			);
			const refreshToken = jwt.sign(
				{ id: newuser.id, email },
				process.env.JWT_REFRESH,
				{ expiresIn: '7d' }
			);
			const accessToken = jwt.sign(
				{ id: newuser.id, email },
				process.env.JWT_ACCESS,
				{ expiresIn: '1h' }
			);
			const newtoken = await Token.create({ userId: newuser.id, refreshToken });
			res.cookie('refreshToken', refreshToken, {
				maxAge: 1000 * 60 * 60 * 24 * 7,
				httpOnly: true,
			});
			res.status(201).json({
				// 201 created
				id: newuser.id,
				email,
				refreshToken,
				accessToken,
				message: `пользователь с email = ${email} зарегистрирован`,
			});
		} catch (e) {
			res.status(500).send(e.message);
		}
	}
);

router.get('/activate/:link', async (req, res) => {
	activationString = req.params.link;
	try {
		const userToActivate = await User.findOne({ where: { activationString } });
		if (!userToActivate) {
			res.status(404).json({
				//404 Not found
				message: `Активация не произведена`,
			});
			return;
		}
		userToActivate.isActivated = true;
		await userToActivate.save();
		res
			.status(302)
			.redirect(`${process.env.FRONT_URL}:${process.env.FRONT_PORT}`); //302 redirect
	} catch (e) {
		res.status(500).send(e.message);
	}
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	try {
		const userExists = await User.findOne({ where: { email } });
		if (!userExists) {
			res.status(404).json({
				//404 Not found
				message: `Пользователь не найден`,
			});
			return;
		}
		if (!userExists.isActivated) {
			res.status(403).json({
				//403 Unauthorized/INACTIVE
				message: `Активация по ссылке из письма для email = ${email} не произведена`,
			});
			return;
		}
		const checkPassword = await bcrypt.compare(password, userExists.password);
		if (!checkPassword) {
			res.status(401).json({
				//401 Unauthorized
				message: `Неверный пароль`,
			});
			return;
		}
		const refreshToken = jwt.sign(
			{ id: userExists.id, email },
			process.env.JWT_REFRESH,
			{ expiresIn: '7d' }
		);
		const accessToken = jwt.sign(
			{ id: userExists.id, email },
			process.env.JWT_ACCESS,
			{ expiresIn: '1h' }
		);
		res.cookie('refreshToken', refreshToken, {
			maxAge: 1000 * 60 * 60 * 24 * 7,
			httpOnly: true,
		});
		res.status(200).json({
			id: userExists.id,
			email,
			refreshToken,
			accessToken,
			message: `Успешный вход пользователя с email = ${email}`,
		});
	} catch (e) {
		res.status(500).send(e.message);
	}
});

router.post('/logout', async (req, res) => {
	try {
		const { refreshToken } = req.cookies;
		if (!refreshToken) {
			res.status(404).json({
				//404 Not found
				message: `Refresh токен не передан в запросе`,
			});
			return;
		}
		const token = await Token.findOne({ where: { refreshToken } });
		if (!token) {
			res.status(404).json({
				//404 Not found
				message: `Refresh токен передан в запросе , но не найден на сервере`,
			});
			return;
		}
		const userToLogout = await User.findOne({ where: { id: token.userId } });
		await token.destroy();
		res.clearCookie('refreshToken');
		res
			.status(200)
			.json({ message: `Выход пользователя с email = ${userToLogout.email}` });
	} catch (e) {
		res.status(500).send(e.message);
	}
});

router.get('/refresh', async (req, res) => {
	const { refreshToken } = req.cookies;
	try {
		if (!refreshToken) {
			res.status(401).json({
				//401 Unauthorized
				message: `Refresh токен не предоставлен`,
			});
		}
		const { id, email } = jwt.verify(refreshToken, process.env.JWT_REFRESH);
		const token = await Token.findOne({ where: { refreshToken } });
		if (!token || !email || !id) {
			res.status(401).json({
				//401 Unauthorized
				message: `Refresh токен не прошёл проверку`,
			});
		}
		const userToRefresh = await User.findOne({ where: { id: token.userId } });
		const newRefreshToken = jwt.sign(
			{ id: userToRefresh.id, email },
			process.env.JWT_REFRESH,
			{ expiresIn: '7d' }
		);
		const newAccessToken = jwt.sign(
			{ id: userToRefresh.id, email },
			process.env.JWT_ACCESS,
			{ expiresIn: '1h' }
		);
		token.refreshToken = newRefreshToken;
		await token.save();

		res.cookie('refreshToken', newRefreshToken, {
			maxAge: 1000 * 60 * 60 * 24 * 7,
			httpOnly: true,
		});
		res.status(200).json({
			id: newuser.id,
			email,
			refreshToken: newRefreshToken,
			accessToken: newAccessToken,
			message: `токены для пользователя с email = ${userToRefresh.email} обновлены`,
		});
	} catch (e) {
		res.status(500).send(e.message);
	}
});

router.get('/example', authCheck, async (req, res) => {
	try {
		const allUsers = await User.findAll();
		return res.json(allUsers);
	} catch (e) {
		res.status(500).send(e.message);
	}
});

module.exports = router;
