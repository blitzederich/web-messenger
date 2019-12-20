const express = require('express');
const router  = express.Router();

const Auth  = require('../../core/Auth/index');
const Users = require('../../core/Users/index');

router.post('/getActivity', async (req, res) => {

    let cookieValue = req.cookies.authId,
        cr_isLogin  = await Auth.isLogin(cookieValue);

    if (!cr_isLogin.status)
        return res.json(cr_isLogin);

    let usersId = req.body.usersId,
        cr_getActivity = await Users.getActivity([usersId]);    

    res.json(cr_getActivity);

});

module.exports = router;