const DataBase = require('../DataBase/index');
const Answer   = require('../Answer/index');

const setActivity = async (userId/*number*/) => {
    try {

        /// check userId: number ///

        userId = userId || '';
        userId = String(userId).trim();

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

        

        let date = +new Date();

        let db_setActivity = await DataBase.query(
            `
                INSERT INTO activity (
                    userId, date
                )
                VALUES (
                    ?, ?
                )
            `,
            [userId, date]
        );

        let activityId = db_setActivity.results.insertId;

        return Promise.resolve(
            Answer(true, { activityId })
        )


    } catch (error) {
        return Promise.resolve(
            Answer(false, 'SYSTEM_ERROR', error)
        );
    }
}

module.exports = setActivity;