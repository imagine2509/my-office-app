/* eslint-disable linebreak-style */
const router = require('express').Router();
const { User } = require('../../db/models');

router.route('/:companyId')
  .get(async (req, res) => {
    try {
      const { companyId } = req.params;
      const users = await User.findAll({
        where: {
          companyId,
          isAdmin: false,
        },
        order: [
          ['id', 'DESC'],
        ],
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.route('/:id')
  .put(async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.update(
        req.body,
        { where: { id } },
      );
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.destroy({ where: { id } });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
