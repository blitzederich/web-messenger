const express = require('express');
const router  = express.Router();

const Auth  = require('../../core/Auth/index');

router.get('/isLogin', async (req, res) => {

    let cookieValue = req.cookies.authId;
    let cr_isLogin = await Auth.isLogin(cookieValue);

    if (cr_isLogin.status !== true)
        res.clearCookie('authId');

    res.json(cr_isLogin)
});

module.exports = router;