const express = require('express');
const router  = express.Router();

const CacheRT = require('cache-rt');
const EventCache = require('../EventCache/index');

const Auth  = require('../core/Auth/index');

router.get('/LongPoll', async (req, res) => {

    // let cookieValue = req.cookies.authId,
    //     cr_isLogin  = await Auth.isLogin(cookieValue);

    // if (!cr_isLogin.status)
    //     return res.json(cr_isLogin);

    // let userId = cr_isLogin.data.userId;

    // let listenerId = CacheRT.addEventListener(userId, (event) => {
    //     res.json({ status: true, event });
    //     CacheRT.removeEventListener(userId, listenerId);
    // });

    // req.on('close', () => {
    //     CacheRT.removeEventListener(userId, listenerId);
    // })
    // req.setTimeout(10*60*1000, () => console.log('timeout'));

    /** EventCache **/
    let cookieValue = req.cookies.authId,
        cr_isLogin  = await Auth.isLogin(cookieValue);

    if (!cr_isLogin.status) {
        return res.json(cr_isLogin);
    }

    let userId      = cr_isLogin.data.userId,
        lastEventId = req.query.lastEventId;

    let listenerId = EventCache.addEventListener(userId, (events) => {
        res.json({ status: true, events });
    }, lastEventId);

    req.on('abort', () => {
        EventCache.removeEventListener(userId, listenerId);
    });

});

module.exports = router;