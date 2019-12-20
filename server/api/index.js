const express = require('express');
const router  = express.Router();

const Auth     = require('./Auth/index');
const Messages = require('./Messages/index');
const Users    = require('./Users/index');

router.use('/Auth', Auth);
router.use('/Messages', Messages);
router.use('/Users', Users);

module.exports = router;