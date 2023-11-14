/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const router = require('express').Router();
const { Room, UserRoom } = require('../../db/models');

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Room.findOne({ where: { id } })
      .then((room) => res.json(room))
      .catch((error) => res.status(500).json({ error: error.message }));
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      await UserRoom.destroy(
        {
          where: {
            roomId: id,
          },
        },
      );
      const room = await Room.findOne({ where: { id } });
      room.destroy();
      res.json(id);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .put((req, res) => {
    const { id } = req.params;
    Room.update(req.body, { where: { id } })
      .then((updatedRoom) => (updatedRoom ? res.json(updatedRoom) : res.status(404).json(updatedRoom)))
      .catch((error) => res.status(500).json({ error: error.message }));
  });

router
  .route('/')
  .get(async (req, res) => {
    try {
      const result = await Room.findAll();
      res.json(result);
    } catch (error) {
      console.log(error.message);
    }
  })
  .post((req, res) => {
    const {
      name, amount, officeId, video, description, photo,
    } = req.body;
    Room.create({
      name,
      amount,
      officeId,
      video,
      description,
      photo,
    })
      .then(
        (newRoom) => (newRoom
          ? res.status(200).json({
            id: newRoom.id,
            name: newRoom.name,
            description: newRoom.description,
          })
          : res.status(409).json({
            message: `failed to create new room with name=${name}`,
          })), // 409 conflict
      )
      .catch((error) => res.status(500).json({ error: error.message }));
  });

module.exports = router;
