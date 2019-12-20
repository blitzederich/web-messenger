const DataBase = require('../DataBase/index');
const Answer   = require('../Answer/index');

/**
 *  
 * @param {string} cookieValue cookie authId
 * 
 * @returns {Promise<{
 *  status: boolean
 * }>}
 */

const logOut = async (cookieValue) => {
    try {

        cookieValue = cookieValue || '';
        cookieValue = String(cookieValue);

        if (cookieValue === '') return Promise.resolve(
            Answer(true)
        );

        if (cookieValue.length > 64) return Promise.resolve(
            Answer(true)
        );

        if (cookieValue.search(/([^a-z0-9_])/ig) !== -1) return Promise.resolve(
            Answer(true)
        );

        DataBase.query(
            `
                UPDATE auth
                SET active=0
                WHERE cookieValue=?
                LIMIT 1
            `,
            [cookieValue]
        )

        return Promise.resolve(
            Answer(true)
        );

    } catch(error) {
        return Promise.resolve(
            Answer(false, 'SYSTEM_ERROR', error)
        );
    }

}

module.exports = logOut;