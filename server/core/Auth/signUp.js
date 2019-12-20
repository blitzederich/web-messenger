const DataBase = require('../DataBase/index');
const Answer   = require('../Answer/index');

const checkLogin = require('../Users/checkLogin');

/**
 * 
 * @param {string} fullName
 * @param {string} login
 * @param {string} password
 * 
 * @returns {Promise<{
 *  status: boolean
 *  data: {
 *   userId: number
 *   date: number
 *   cookieValue: string
 *  }
 * }>}
 * 
 */

const signUp = async (fullName, login, password) => {
    try {

        fullName = fullName || '';
        fullName = String(fullName).trim();

        login = login || '';
        login = String(login).trim();

        password = password || '';
        password = String(password);

        /// check fullName: string ///

        if (fullName === '') return Promise.resolve(
            Answer(false, 'FULLNAME_NULL')
        );

        if (fullName.length > 64) return Promise.resolve(
            Answer(false, 'FULLNAME_LONG')
        );

        if (fullName.search(/([^a-zа-я ])/ig) !== -1) return Promise.resolve(
            Answer(false, 'FULLNAME_INVALID')
        );

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

        /// checkLogin

        let cr_checkLogin = await checkLogin(login, true);

        if (!cr_checkLogin.status)
            return Promise.resolve(cr_checkLogin);

        /// insert in DB

        let date = +new Date();
        let db_signUp = await DataBase.query(
            `
                INSERT INTO users (
                    login, password, date, fullName
                )
                VALUES (
                    ?, ?, ?, ?
                )
            `,
            [login, password, date, fullName],
            true
        );

        let userId = db_signUp.results.insertId;

        /// auth

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

        

        return Promise.resolve(
            Answer(true, {userId, date, cookieValue})
        );

    } catch(error) {
        return Promise.resolve(
            Answer(false, 'SYSTEM_ERROR', error)
        );
    }

}

module.exports = signUp;