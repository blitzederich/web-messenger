const checkLogin  = require('./checkLogin');
const search      = require('./search');
const changeLogin = require('./changeLogin');
const getUsers    = require('./getUsers');
const getActivity = require('./getActivity');
const setActivity = require('./setActivity');

const Users = {};

Users.checkLogin  = checkLogin;
Users.search      = search;
Users.changeLogin = changeLogin;
Users.getUsers    = getUsers;
Users.getActivity = getActivity;
Users.setActivity = setActivity;

module.exports = Users;