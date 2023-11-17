/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
require('dotenv').config();
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { Token, User, Company } = require('../../db/models');
const sendEmail = require('../../sendEmail');

router.post(
  '/register',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    const {
      email, password, firstName, lastName, isAdminValue, company,
    } = req.body;
    if (!errors.isEmpty()) {
      res
        .status(422)
        .json({ message: 'Недопустимые данные', errors: errors.array() }); // 422 Unprocessable entity
      return;
    }
    try {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        res.status(409).json({
          // 409 Conflict
          message: `email = ${email} уже занят`,
        });
        return;
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      let activationString = await bcrypt.hash(email, salt);
      activationString = activationString.replace(/[^a-zA-Z0-9]+/g, '');
      let isAdmin = false;
      let userCompanyid;

      const companyExists = await Company.findOne({ where: { name: company } });

      // если компания существует , юзер , может быть , получает её айди
      if (companyExists) {
        userCompanyid = companyExists.id;
      }

      // если компания существует , то и админ уже есть . кто-то же её зарегал.
      if (companyExists && isAdminValue === 'new') {
        res.status(409).json({
          // 409 Conflict
          message: `У компания = ${company} уже есть босс`,
        });
        return; // валим
      }

      // Вась , ну ты чо
      if (!companyExists && isAdminValue !== 'new') {
        res.status(409).json({
          // 409 Conflict
          message: `Компания = ${company} не найдена. Спроси в отделе кадров где ты работаешь`,
        });
        return; // валим
      }

      // ну ок , такой компании нет и ты хочешь быть босссом:
      if (isAdminValue === 'new' && !companyExists) {
        isAdmin = true;
        const newCompany = await Company.create({
          name: company,
        });
        userCompanyid = newCompany.id; // если компания новая , юзер получает её айди
        // идём дальше
      }

      const newuser = await User.create({
        isActivated: false,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        isAdmin,
        companyId: userCompanyid,
        activationString,
        isApproved: isAdmin,
      });
      sendEmail(
        email,
        'Активация нового пользователя',
        'Reservations:',
        'Для активации перейдите по ссылке',
        `${process.env.API_URL}:${process.env.API_PORT}/api/user/activate/${activationString}`,
      );
      const refreshToken = jwt.sign(
        { id: newuser.id, email, isActivated: newuser.isActivated },
        process.env.JWT_REFRESH,
        { expiresIn: '7d' },
      );
      const accessToken = jwt.sign(
        { id: newuser.id, email, isActivated: newuser.isActivated },
        process.env.JWT_ACCESS,
        { expiresIn: '1h' },
      );
      const newtoken = await Token.create({ refreshToken });
      res.cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: true,
        sameSite: 'None',
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
      console.log(e.message);
      res.status(500).send(e.message);
    }
  },
);

module.exports = router;
