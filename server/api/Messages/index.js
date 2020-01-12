const express = require('express');
const router  = express.Router();

const getDialogs  = require('./getDialogs');
const getHistory  = require('./getHistory');
const sendMessage = require('./sendMessage');
const readHistory = require('./readHistory');
const setTyping   = require('./setTyping');

router.use('/', getDialogs);
router.use('/', getHistory);
router.use('/', sendMessage);
router.use('/', readHistory);
router.use('/', setTyping);

module.exports = router;