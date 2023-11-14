const router = require('express').Router()
const { User } = require('../../db/models')
// компоненты

// маршрутизация главной страницы
router.route('/:userId').get(async (req, res) => {
  const { userId } = req.params
  const { companyId } = await User.findOne({
    where: {
      id: userId,
    },
  })
  const usersFromCompany = await User.findAll({
    where: {
      companyId,
    },
    attributes: ['firstName', 'lastName', 'birthDate'],
  })
  res.json(usersFromCompany)
})

module.exports = router
