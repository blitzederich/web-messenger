const express = require('express');
const router  = express.Router();

const Auth  = require('../../core/Auth/index');
const Users = require('../../core/Users/index');

router.post('/search', async (req, res) => {

    let textSearch = req.body.textSearch;

    let cookieValue = req.cookies.authId,
        cr_isLogin  = await Auth.isLogin(cookieValue);

    if (!cr_isLogin.status)
        return res.json(cr_isLogin);

    let cr_search = await Users.search(textSearch);

    res.json(cr_search);

});

module.exports = router;