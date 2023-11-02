require('dotenv').config();
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Token, User } = require('../../db/models');
const sendEmail = require('../../sendEmail');
const { body, validationResult } = require('express-validator');

router.post(
	'/register',
	body('email').isEmail(),
	body('password').isLength({ min: 6 }),
	async (req, res) => {
		const errors = validationResult(req);
		const { email, password } = req.body;
		console.log(errors, email, password);
		if (!errors.isEmpty()) {
			res
				.status(422)
				.json({ message: `Недопустимые данные`, errors: errors.array() }); //422 Unprocessable entity
			return;
		}
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
				{ id: newuser.id, email, isActivated: newuser.isActivated },
				process.env.JWT_REFRESH,
				{ expiresIn: '7d' }
			);
			const accessToken = jwt.sign(
				{ id: newuser.id, email, isActivated: newuser.isActivated },
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
				isActivated: newuser.isActivated,
				refreshToken,
				accessToken,
				message: `Пользователь с email = ${email} зарегистрирован`,
			});
		} catch (e) {
			res.status(500).send(e.message);
		}
	}
);

module.exports = router;
