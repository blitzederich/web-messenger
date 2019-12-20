const signUp = require('./signUp');
const signIn = require('./signIn');
const isLogin = require('./isLogin');
const logOut = require('./logOut');

const Auth = {};

Auth.signUp = signUp;
Auth.signIn = signIn;
Auth.isLogin = isLogin;
Auth.logOut = logOut;

module.exports = Auth;