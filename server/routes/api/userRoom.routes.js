const router = require('express').Router()
const { UserRoom } = require('../../db/models')

router.route('/').get((req, res) => {
  UserRoom.findAll({ raw: true })
    .then((allUserRoom) => res.json(allUserRoom))
    .catch((error) => res.status(500).json({ error: error.message }))
})

router
  .route('/:roomId')
  .post((req, res) => {
    try {
      const { startTime, endTime, userId } = req.body
      const { roomId } = req.params
      UserRoom.create({ startTime, endTime, userId, roomId })
        .then(
          (newUserRoom) =>
            newUserRoom
              ? res.status(200).json({
                  id: newUserRoom.id,
                  userId: newUserRoom.userId,
                  startTime: newUserRoom.startTime,
                  endTime: newUserRoom.endTime,
                })
              : res.status(409).json({
                  message: `failed to book room`,
                }) // 409 conflict
        )
        .catch((error) => res.status(500).json({ error: error.message }))
    } catch (error) {
      console.log(error.message)
    }
  })
  .get((req, res) => {
    const { roomId } = req.params
    UserRoom.findAll({ where: { roomId }, raw: true })
      .then((allUserRoom) => res.json(allUserRoom))
      .catch((error) => res.status(500).json({ error: error.message }))
  })

router.route('/bookings/:userId').get((req, res) => {
  const { userId } = req.params
  UserRoom.findAll({ where: { userId }, raw: true })
    .then((allUserRoom) => res.json(allUserRoom))
    .catch((error) => res.status(500).json({ error: error.message }))
})

router.route('/bookings/:bookingId').delete(async (req, res) => {
  try {
    const { bookingId } = req.params
    const booking = await UserRoom.findOne({ where: { id: bookingId } })
    const response = await UserRoom.destroy({ where: { id: bookingId } })
    if (response) {
      res.status(200).json(booking)
    }
  } catch ({ message }) {
    res.status(500).json({ message })
  }
})

module.exports = router
