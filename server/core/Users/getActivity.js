const DataBase = require('../DataBase/index');
const Answer   = require('../Answer/index');

/**
 * @param {Array<number>} usersId 
 */
const getActivity = async (usersId) => {
    try {

        if (!Array.isArray(usersId)) return Promise.resolve(
            Answer(false, 'CLIENT_ERROR')
        );

        let db_getActivity = await DataBase.query(
            `
                SELECT id, userId, date
                FROM activity
                WHERE id IN (
                    SELECT MAX(id) as id
                    FROM activity 
                    WHERE userId IN(?)
                    GROUP BY userId
                )
            `,
            [usersId]
        );

        let activity = db_getActivity.results;

        return Promise.resolve(
            Answer(true, { activity })
        )


    } catch (error) {
        return Promise.resolve(
            Answer(false, 'SYSTEM_ERROR', error)
        );
    }
}

module.exports = getActivity;