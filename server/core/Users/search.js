const DataBase = require('../DataBase/index');
const Answer   = require('../Answer/index');

/**
 * @param {string} text 
 */

const search = async (text) => {
    try {

        text = text || '';
        text = String(text).trim().slice(0, 64);

        if (text === '') return Promise.resolve(
            Answer(true, { users: [] })
        );

        let db_search = await DataBase.query(
            `
                SELECT id, login, fullName
                FROM users
                WHERE fullName LIKE ? OR login LIKE ?
                LIMIT 50
            `,
            [ `%${text}%`, `%${text}%` ]
        );

        let users = db_search.results;

        return Promise.resolve(
            Answer(true, { users })
        );

    } catch(error) {
        return Promise.resolve(
            Answer(false, 'SYSTEM_ERROR', error)
        );
    }
};

module.exports = search;