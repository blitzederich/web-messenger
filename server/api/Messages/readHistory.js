const express = require('express');
const router  = express.Router();

const Auth     = require('../../core/Auth/index');
const Messages = require('../../core/Messages/index');

router.post('/readHistory', async (req, res) => {

    let peerId = req.body.peerId;

    let cookieValue = req.cookies.authId,
        cr_isLogin  = await Auth.isLogin(cookieValue);

    if (!cr_isLogin.status)
        return res.json(cr_isLogin);

    let userId = cr_isLogin.data.userId;

    let cr_readHistory = await Messages.readHistory(userId, peerId);

    res.json(cr_readHistory);

});

module.exports = router;