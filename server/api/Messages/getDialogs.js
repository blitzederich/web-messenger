const express = require('express');
const router  = express.Router();

const Auth     = require('../../core/Auth/index');
const Messages = require('../../core/Messages/index');

router.get('/getDialogs', async (req, res) => {
    
    let cookieValue = req.cookies.authId,
        cr_isLogin  = await Auth.isLogin(cookieValue);

    if (!cr_isLogin.status)
        return res.json(cr_isLogin);

    let userId = cr_isLogin.data.userId;

    let cr_getDialogs = await Messages.getDialogs(userId);

    res.json(cr_getDialogs);

});

module.exports = router;