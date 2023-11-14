require('dotenv').config()
const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const { Token, User, Company } = require('../../db/models')
const sendEmail = require('../../sendEmail')

router.post(
  '/register',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req)
    const { email, password, firstName, lastName, isAdminValue, company } =
      req.body
    if (!errors.isEmpty()) {
      res
        .status(422)
        .json({ message: 'Недопустимые данные', errors: errors.array() }) // 422 Unprocessable entity
      return
    }
    try {
      const userExists = await User.findOne({ where: { email } })
      if (userExists) {
        res.status(409).json({
          // 409 Conflict
          message: `email = ${email} уже занят`,
        })
        return
      }
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      let activationString = await bcrypt.hash(email, salt)
      activationString = activationString.replace(/[^a-zA-Z0-9]+/g, '')
      let isAdmin = false
      if (isAdminValue === 'new') {
        isAdmin = true
      }
      const newCompany = await Company.create({
        name: company,
      })
      const newuser = await User.create({
        isActivated: false,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        isAdmin,
        companyId: newCompany.id,
        activationString,
      })
      sendEmail(
        email,
        'Активация нового пользователя',
        'Reservations:',
        'Для активации перейдите по ссылке',
        `${process.env.API_URL}:${process.env.API_PORT}/api/user/activate/${activationString}`
      )
      const refreshToken = jwt.sign(
        { id: newuser.id, email, isActivated: newuser.isActivated },
        process.env.JWT_REFRESH,
        { expiresIn: '7d' }
      )
      const accessToken = jwt.sign(
        { id: newuser.id, email, isActivated: newuser.isActivated },
        process.env.JWT_ACCESS,
        { expiresIn: '1h' }
      )
      const newtoken = await Token.create({ refreshToken })
      res.cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      })
      res.status(201).json({
        // 201 created
        id: newuser.id,
        email,
        isActivated: newuser.isActivated,
        refreshToken,
        accessToken,
        message: `Пользователь с email = ${email} зарегистрирован`,
      })
    } catch (e) {
      console.log(e.message)
      res.status(500).send(e.message)
    }
  }
)

module.exports = router
