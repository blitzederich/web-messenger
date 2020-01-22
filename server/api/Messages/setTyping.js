const express = require('express');
const router  = express.Router();

const Auth        = require('../../core/Auth/index');
const EventCache  = require('../../EventCache/index');

router.post('/setTyping', async (req, res) => {
    
    let cookieValue = req.cookies.authId,
        peerId      = req.body.peerId,
        cr_isLogin  = await Auth.isLogin(cookieValue);

    if (!cr_isLogin.status)
        return res.json(cr_isLogin);

    let userId = cr_isLogin.data.userId;

    EventCache.push(peerId, 'message:typing', {peerId: userId});

    res.json({});

});

module.exports = router;