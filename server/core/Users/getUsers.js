const DataBase = require('../DataBase/index');
const Answer   = require('../Answer/index');

/**
 * @param {Array<number>} usersId 
 */
const getUsers = async (usersId) => {
    try {

        if (!Array.isArray(usersId)) return Promise.resolve(
            Answer(false, 'CLIENT_ERROR')
        );

        let db_getUsers = await DataBase.query(
            `
                SELECT id, login, fullName, lastActivity
                FROM users
                LEFT JOIN 
                (
                    SELECT userId, MAX(date) AS lastActivity
                    FROM activity
                    GROUP BY userId
                ) _activity 
                ON users.id = _activity.userId
                WHERE id IN (?)
            `,
            [usersId]
        );

        let users = db_getUsers.results;

        let usersObj = {};
        users.map(user => {
            usersObj[ user.id ] = user
        });

        return Promise.resolve(
            Answer(true, { users: usersObj })
        );

    } catch (error) {
        return Promise.resolve(
            Answer(false, 'SYSTEM_ERROR', error)
        );
    }
};

module.exports = getUsers;