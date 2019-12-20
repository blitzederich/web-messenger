const express = require('express');
const router  = express.Router();

const checkLogin  = require('./checkLogin');
const changeLogin = require('./changeLogin');
const search      = require('./search');
const getUsers    = require('./getUsers');
const getActivity = require('./getActivity');

router.use('/', checkLogin);
router.use('/', changeLogin);
router.use('/', search);
router.use('/', getUsers);
router.use('/', getActivity);

module.exports = router;