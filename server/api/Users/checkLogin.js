const express = require('express');
const router  = express.Router();

const Users = require('../../core/Users/index');

router.post('/checkLogin', async (req, res) => {

    let login = req.body.login,
        cr_checkLogin = await Users.checkLogin(login);    

    res.json(cr_checkLogin);

});

module.exports = router;