require('dotenv').config()
const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../../db/models')
const authCheck = require('../../middleware/authCheck')

router.get('/getall', authCheck, async (req, res) => {
  try {
    const { isActivated } = req.user
    if (!isActivated) {
      res.status(403).json({
        // 403 Unauthorized/Inactive
        message:
          'Недостаточно прав для доступа к данным. Аккаунт не активирован',
      })
      return
    }
    const allUsers = await User.findAll()
    return res.json(allUsers)
  } catch (e) {
    res.status(500).send(e.message)
  }
})

router.get('get/:companyId', authCheck, async (req, res) => {
  try {
    const { isActivated } = req.user
    if (!isActivated) {
      res.status(403).json({
        // 403 Unauthorized/Inactive
        message:
          'Недостаточно прав для доступа к данным. Аккаунт не активирован',
      })
    } else {
      const usersToApprove = await User.findAll({
        where: { isActivated: false },
      })
      res.json(usersToApprove)
    }
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router
