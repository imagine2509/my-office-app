require('dotenv').config();
const router = require('express').Router();
const {User} = require('../../../db/models');

router.get('/activate/:link' , async (req, res) => {
    activationString = req.params.link
      try {
        const userToActivate = await User.findOne({ where: { activationString } });
        if (!userToActivate) {
            res.status(404).json({ //404 Not found
                message: `Активация не произведена`
            });
            return
        }
        userToActivate.isActivated = true
        await userToActivate.save()
          res.status(302).redirect(`${process.env.FRONT_URL}:${process.env.FRONT_PORT}`); //302 redirect
      } catch (e) {
          res.status(500).send(e.message);
      }
  })

module.exports = router;