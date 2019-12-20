const express = require('express');
const router  = express.Router();

const Auth  = require('../../core/Auth/index');

router.post('/signUp', async (req, res) => {
    
    let fullName = req.body.fullName,
        login    = req.body.login,
        password = req.body.password;

    let cr_singUp = await Auth.signUp(fullName, login, password);

    if (cr_singUp.status)
        res.cookie('authId', cr_singUp.data.cookieValue);

    res.json(cr_singUp);

});

module.exports = router;

