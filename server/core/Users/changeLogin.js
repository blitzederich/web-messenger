const DataBase = require('../DataBase/index');
const Answer   = require('../Answer/index');

const checkLogin = require('./checkLogin');

/**
 * 
 * @param {number} userId 
 * @param {string} login 
 */
const changeLogin = async (userId, login) => {
    try {

        userId = userId || '';
        userId = String(userId);


        if (userId === '') return Promise.resolve(
            Answer(false, 'SYSTEM_ERROR')
        );

        if (userId.length > 11) return Promise.resolve(
            Answer(false, 'SYSTEM_ERROR')
        );

        if (userId.search(/([^0-9])/ig) !== -1) return Promise.resolve(
            Answer(false, 'SYSTEM_ERROR')
        );

        userId = Number(userId);


        let cr_checkLogin = await checkLogin(login);

        if (!cr_checkLogin.status) 
            return Promise.resolve(cr_checkLogin);

        login = cr_checkLogin.data.login;


        let db_changeLogin = await DataBase.query(
            `
                UPDATE users
                SET login = ?
                WHERE id = ?
                LIMIT 1
            `,
            [ login, userId ]
        );

        return Promise.resolve(
            Answer(true, { login })
        );
        
    } catch(error) {
        return Promise.resolve(
            Answer(false, 'SYSTEM_ERROR', error)
        );
    }
}

module.exports = changeLogin;