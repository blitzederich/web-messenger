const express = require('express');
const router  = express.Router();

const CacheRT = require('cache-rt');

const Auth  = require('../core/Auth/index');

router.get('/LongPoll', async (req, res) => {

    let cookieValue = req.cookies.authId,
        cr_isLogin  = await Auth.isLogin(cookieValue);

    if (!cr_isLogin.status)
        return res.json(cr_isLogin);

    let userId = cr_isLogin.data.userId;

    let listenerId = CacheRT.addEventListener(userId, (event) => {
        res.json({ status: true, event });
        CacheRT.removeEventListener(userId, listenerId);
    });

    req.on('close', () => CacheRT.removeEventListener(userId, listenerId));

    req.setTimeout(10*60*1000, () => console.log('timeout'));

});

module.exports = router;