const { findAll } = require('../handlers/MessageHandler');

const auth = require('../middlewares/auth');

const router = require('express').Router();

router.get('/', auth, findAll);

module.exports = router;
