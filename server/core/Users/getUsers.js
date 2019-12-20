const DataBase = require('../DataBase/index');
const Answer   = require('../Answer/index');

const getUsers = async (usersId/*array*/) => {
    try {

        if (!Array.isArray(usersId)) return Promise.resolve(
            Answer(false, 'CLIENT_ERROR')
        );

        let db_getUsers = await DataBase.query(
            `
                SELECT id, login, fullName
                FROM users
                WHERE id IN (?)
            `,
            [usersId]
        );

        let users = db_getUsers.results;

        return Promise.resolve(
            Answer(true, { users })
        )


    } catch (error) {
        return Promise.resolve(
            Answer(false, 'SYSTEM_ERROR', error)
        );
    }
};

module.exports = getUsers;