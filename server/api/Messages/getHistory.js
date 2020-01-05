const express = require('express');
const router  = express.Router();

const Auth     = require('../../core/Auth/index');
const Messages = require('../../core/Messages/index');

router.post('/getHistory', async (req, res) => {
    
    let peerId = req.body.peerId,
        offset = req.body.offset,
        limit  = req.body.limit;
    
    let cookieValue = req.cookies.authId,
        cr_isLogin  = await Auth.isLogin(cookieValue);

    if (!cr_isLogin.status)
        return res.json(cr_isLogin);

    let userId = cr_isLogin.data.userId;

    let cr_getHistory = await Messages.getHistory(userId, peerId, offset, limit);

    res.json(cr_getHistory);
    //setTimeout(() => {res.json(cr_getHistory);}, 3000);

});

module.exports = router;