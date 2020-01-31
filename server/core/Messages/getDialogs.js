const DataBase = require('../DataBase/index');
const Answer   = require('../Answer/index');

/**
 * Get dialogs for user.
 * 
 * @typedef {{
 *  id: number
 *  senderId: number
 *  recipientId: number
 *  date: number
 *  text: string
 *  unread: boolean
 *  peerId: number
 *  peerFullName: string
 * }} Dialog
 *
 * @param {number} userId User id.
 * 
 * @returns {Promise<{
 *  status: boolean
 *  data: {
 *   dialogs: Array<Dialog>
 *  }
 * }>} Special `Answer` object.
 */

const getDialogs = async (userId) => {
    try {

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

        let db_getDialogs = await DataBase.query(
            `
                SELECT messages.id, messages.peerId, messages.senderId, messages.recipientId, messages.date, messages.text, messages.unread, users.fullName AS peerFullName, users.login as peerLogin
                FROM (
                    SELECT id, senderId, recipientId, date, text, unread,
                    CASE
                        WHEN senderId = ? THEN recipientId
                        ELSE senderId
                    END AS peerId
                    FROM messages
                    WHERE messages.id IN (
                        SELECT id
                        FROM (
                            SELECT MAX(id) as id,
                            CASE
                                WHEN senderId > recipientId THEN CONCAT(recipientId, ':', senderId)
                                ELSE CONCAT(senderId, ':', recipientId)
                            END AS _sr
                            FROM messages
                            WHERE senderId = ? OR recipientId = ?
                            GROUP BY _sr
                        ) _m
                    )
                ) messages
                LEFT JOIN users
                ON peerId = users.id
                ORDER BY id DESC
            `,
            [userId, userId, userId]       
        );

        let dialogs = db_getDialogs.results;

        return Promise.resolve(
            Answer(true, { dialogs })
        );

    } catch(error) {
        return Promise.resolve(
            Answer(false, 'SYSTEM_ERROR', error)
        );
    }
}

module.exports = getDialogs;