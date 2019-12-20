const Auth     = require('./server/core/Auth/index');
const Messages = require('./server/core/Messages/index');
const Users    = require('./server/core/Users/index');

const CacheRT = require('cache-rt');

/*
Auth.signIn('xander', 'cfvjhjljd').then(
    res => console.log(res)
)
*/

/*

Auth.signUp('Светик', 'swetik', '12345').then(
    res => console.log(res)
);

*/
/*
Auth.isLogin('hoshimin_1571920487677').then(
    res => console.log(res)
)
*/

/*

Messages.sendMessage(1, 5, 'Привет, ты сегодня бежишь?').then(
    res => console.log(res)
);
*/

/*

Messages.getHistory(1, 3).then(
    res => console.log(res.data.messages)
)

*/


/*

Messages.getDialogs(1).then(
    res => console.log(res.data)
);

*/

/*
Users.search('xander').then(
    res => console.log(res.data)
)
*/

/*
Users.changeLogin(1, 'xander').then(
    res => console.log(res)
)
*/

/*

Users.getUsers([1, 2, 3, 4, 5]).then(
    res => console.log(res.data)
);

*/

/*

Users.getActivity([1, 5]).then(
    res => console.log(res.data)
);

*/