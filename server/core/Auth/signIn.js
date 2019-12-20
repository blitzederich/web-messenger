const DataBase = require('../DataBase/index');
const Answer   = require('../Answer/index');

/**
 * 
 * @param {string} login User login.
 * @param {string} password User password
 * 
 * @returns {Promise<{
 *  status: boolean
 *  data: {
 *   userId: number
 *   date: number
 *   cookieValue: string
 *  }
 * }>}
 */

const signIn = async (login, password) => {
    try {

        login = login || '';
        login = String(login).trim();

        password = password || '';
        password = String(password);

        /// check login: string ///

        if (login === '') return Promise.resolve(
            Answer(false, 'LOGIN_NULL')
        );

        if (login.length > 64) return Promise.resolve(
            Answer(false, 'LOGIN_LONG')
        );

        if (login.search(/([^a-z0-9])/g) !== -1) return Promise.resolve(
            Answer(false, 'LOGIN_INVALID')
        );

        /// check password: string ///

        if (password === '') return Promise.resolve(
            Answer(false, 'PASSWORD_NULL')
        );

        if (password.length > 64) return Promise.resolve(
            Answer(false, 'PASSWORD_LONG')
        );



        let db_signIn = await DataBase.query(
            `
                SELECT id, password
                FROM users
                WHERE login=?
                LIMIT 1
            `,
            [login]
        );

        if (db_signIn.results.length === 0) return Promise.resolve(
            Answer(false, 'LOGIN_WRONG')
        )
    
        if (db_signIn.results[ 0 ].password !== password) return Promise.resolve(
            Answer(false, 'PASSWORD_WRONG')
        )

        let date = +new Date();
        let userId = db_signIn.results[ 0 ].id;

        /// auth ///

        let cookieValue = login + '_' + date;
        let db_auth = await DataBase.query(
            `
                INSERT INTO auth (
                    userId, date, active, cookieValue
                )
                VALUES (
                    ?, ?, ?, ?
                )
            `,
            [userId, date, true, cookieValue],
            true
        );

        // result

        return Promise.resolve(
            Answer(true, {userId, date, cookieValue})
        );

    } catch(error) {
        return Promise.resolve(
            Answer(false, 'SYSTEM_ERROR', error)
        );
    }

}

module.exports = signIn;