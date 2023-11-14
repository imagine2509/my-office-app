const router = require('express').Router()
const { UserRoom } = require('../../db/models')

router.route('/').get((req, res) => {
  UserRoom.findAll({ raw: true })
    .then((allUserRoom) => res.json(allUserRoom))
    .catch((error) => res.status(500).json({ error: error.message }))
})

router.route('/:roomId').post((req, res) => {
  try {
    const { startTime, endTime } = req.body
    const { roomId } = req.params
    // const { userId } = res.localStorage.getItem;
    UserRoom.create({ startTime, endTime, roomId })
      .then(
        (newUserRoom) =>
          newUserRoom
            ? res.status(200).json({
                id: newUserRoom.id,
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

module.exports = router
