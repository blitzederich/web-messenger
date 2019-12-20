const express = require('express');
const router  = express.Router();

const isLogin = require('./isLogin');
const signUp  = require('./singUp');
const signIn  = require('./signIn');
const logOut  = require('./logOut');

router.use('/', isLogin);
router.use('/', signUp);
router.use('/', signIn);
router.use('/', logOut);

module.exports = router;