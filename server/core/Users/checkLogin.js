const DataBase = require('../DataBase/index');
const Answer   = require('../Answer/index');

const checkLogin = async (login/*string*/, inspected=false) => {
    try {

        if (!inspected) {

            login = login || '';
            login = String(login).trim();

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

        }

        /// check login ///

        let db_checkLogin = await DataBase.query(
            `
                SELECT id
                FROM users
                WHERE login=?
                LIMIT 1
            `,
            [login]
        );

        if (db_checkLogin.results.length !== 0) return Promise.resolve(
            Answer(false, 'LOGIN_BUSY')  
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

module.exports = checkLogin;