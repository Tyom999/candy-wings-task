const { create, login, findAll } = require('../handlers/UserHandler');

const auth = require('../middlewares/auth');

const router = require('express').Router();

router.get('/', auth, findAll);

router.post('/', create);
router.post('/login', login);

module.exports = router;
