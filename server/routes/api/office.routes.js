/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const router = require('express').Router()
const { Office, User } = require('../../db/models')

router.route('/office').get((req, res) => {
  Office.findAll({ raw: true })
    .then((allOffices) => res.json(allOffices))
    .catch((error) => res.status(500).json({ error: error.message }))
})

router
  .route('/office/:id')
  .get((req, res) => {
    const { id } = req.params
    Office.findOne({ where: { id } })
      .then((office) => res.json(office))
      .catch((error) => res.status(500).json({ error: error.message }))
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params
      const users = await User.findAll({
        where: {
          officeId: id,
        },
        attributes: ['id'],
        raw: true,
      })
      await User.update(
        { officeId: null },
        {
          where: {
            id: users.reduce((acc, userId) => {
              acc.push(userId.id)
              return acc
            }, []),
          },
        }
      )
      const office = await Office.findOne({ where: { id } })
      office.destroy()
      res.json(id)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })
  .put((req, res) => {
    const { id } = req.params
    Office.update(req.body, { where: { id } })
      .then((updatedOffice) =>
        updatedOffice
          ? res.json(updatedOffice)
          : res.status(404).json(updatedOffice)
      )
      .catch((error) => res.status(500).json({ error: error.message }))
  })

router.route('/office').post((req, res) => {
  const { name, address, companyId } = req.body
  Office.create({ name, address, companyId })
    .then(
      (newOffice) =>
        newOffice
          ? res.status(200).json({
              id: newOffice.id,
              name: newOffice.name,
              address: newOffice.address,
              companyId: newOffice.companyId,
            })
          : res.status(409).json({
              message: `failed to create new office with name=${name} and address=${address}`,
            }) // 409 conflict
    )
    .catch((error) => res.status(500).json({ error: error.message }))
})

module.exports = router
