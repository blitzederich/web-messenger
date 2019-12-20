const express = require('express');
const router  = express.Router();

const getDialogs = require('./getDialogs');
const getHistory = require('./getHistory');
const sendMessage = require('./sendMessage');
const readHistory = require('./readHistory');

router.use('/', getDialogs);
router.use('/', getHistory);
router.use('/', sendMessage);
router.use('/', readHistory);

module.exports = router;