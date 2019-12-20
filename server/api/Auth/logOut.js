const express = require('express');
const router  = express.Router();

const Auth = require('../../core/Auth/index');

router.post('/logOut', async (req, res) => {
    
    let cookieValue = req.cookies.authId;

    let cr_logOut = await Auth.logOut(cookieValue);

    res.clearCookie('authId');
    res.json(cr_logOut);
    
});

module.exports = router;

