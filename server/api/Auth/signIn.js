const express = require('express');
const router  = express.Router();

const Auth  = require('../../core/Auth/index');

router.post('/signIn', async (req, res) => {
    
    let login    = req.body.login,
        password = req.body.password;

    let cr_signIn = await Auth.signIn(login, password);

    if (!cr_signIn.status)
        return res.json(cr_signIn);
    
    res.cookie('authId', cr_signIn.data.cookieValue);

    res.json(cr_signIn);

});

module.exports = router;

