const DataBase = require('../DataBase/index');
const Answer   = require('../Answer/index');

const Users = require('../Users/index');

/**
 * 
 * @param {string} cookieValue cookie authId
 * 
 * @returns {Promise<{
 *  status: boolean
 *  data: {
 *   userId: number
 *  }
 * }>}
 * 
 */

const isLogin = async (cookieValue) => {
    try {

        cookieValue = cookieValue || '';
        cookieValue = String(cookieValue);

        if (cookieValue === '') return Promise.resolve(
            Answer(false, 'NOT_AUTHORIZED')
        );

        if (cookieValue.length > 64) return Promise.resolve(
            Answer(false, 'NOT_AUTHORIZED')
        );

        if (cookieValue.search(/([^a-z0-9_])/ig) !== -1) return Promise.resolve(
            Answer(false, 'NOT_AUTHORIZED')
        );

        let db_login = await DataBase.query(
            `
                SELECT userId
                FROM auth
                WHERE cookieValue=?
                LIMIT 1
            `,
            [cookieValue]
        );

        if (db_login.results.length === 0) return Promise.resolve(
            Answer(false, 'NOT_AUTHORIZED')
        );

        let userId = db_login.results[ 0 ].userId;

        Users.setActivity(userId);

        return Promise.resolve(
            Answer(true, { userId })
        );

    } catch(error) {
        return Promise.resolve(
            Answer(false, 'SYSTEM_ERROR', error)
        );
    }

}

module.exports = isLogin;