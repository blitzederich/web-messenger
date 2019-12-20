const express = require('express');
const router  = express.Router();

const Auth     = require('../../core/Auth/index');
const Messages = require('../../core/Messages/index');

router.post('/sendMessage', async (req, res) => {
    
    let recipientId = req.body.recipientId,
        text        = req.body.text;

    let cookieValue = req.cookies.authId,
        cr_isLogin  = await Auth.isLogin(cookieValue);

    if (!cr_isLogin.status)
        return res.json(cr_isLogin);

    let userId = cr_isLogin.data.userId;

    let cr_sendMessage = await Messages.sendMessage(userId, recipientId, text);

    res.json(cr_sendMessage);

});

module.exports = router;