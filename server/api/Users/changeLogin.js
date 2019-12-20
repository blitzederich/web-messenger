const express = require('express');
const router  = express.Router();

const Auth  = require('../../core/Auth/index');
const Users = require('../../core/Users/index');

router.post('/changeLogin', async (req, res) => {

    let login = req.body.login;

    let cookieValue = req.cookies.authId,
        cr_isLogin  = await Auth.isLogin(cookieValue);

    if (!cr_isLogin.status)
        return res.json(cr_isLogin);

    let userId = cr_isLogin.data.userId;

    let cr_changeLogin = await Users.changeLogin(userId, login);

    res.json(cr_changeLogin);

});

module.exports = router;