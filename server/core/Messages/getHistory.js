const DataBase = require('../DataBase/index');
const Answer   = require('../Answer/index');

const readHistory = require('./readHistory');

/**
 * Get history for user with peer.
 * 
 * @typedef {{
 *  id: number
 *  senderId: number
 *  recipientId: number
 *  date: number
 *  text: string
 *  unread: boolean
 * }} Message
 *
 * @param {number} userId User id.
 * @param {number} peerId Peer id.
 * @param {number} offset Offset.
 * @param {number} limit Limit.
 * 
 * @returns {Promise<{
 *  status: boolean
 *  data: {
 *   messages: Array<Message>
 *  }
 * }>} Special `Answer` object.
 */

const getHistory = async (userId, peerId, offset=0, limit=50) => {
    try {

        userId = userId || '';
        userId = String(userId).trim();

        peerId = peerId || '';
        peerId = String(peerId).trim();


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


        if (peerId === '') return Promise.resolve(
            Answer(false, 'PEER_ID_NULL')
        );

        if (peerId.length > 11) return Promise.resolve(
            Answer(false, 'PEER_ID_LONG')
        );

        if (peerId.search(/([^0-9])/ig) !== -1) return Promise.resolve(
            Answer(false, 'PEER_ID_INVALID')
        );

        peerId = Number(peerId);


        let cr_readHistory = await readHistory(userId, peerId);


        let db_getHistory = await DataBase.query(
            `
                SELECT messages.id AS id, messages.date AS date, text, senderId, recipientId, unread
                FROM messages
                LEFT JOIN users
                ON messages.senderId = users.id
                WHERE ((messages.senderId = ? AND messages.recipientId = ?) OR (messages.senderId = ? AND messages.recipientId = ?)) AND messages.deleted = 0
                ORDER BY id DESC
                LIMIT ? OFFSET ?
            `,
            [ userId, peerId, peerId, userId, limit, offset ]       
        );

        let messages = db_getHistory.results;

        return Promise.resolve(
            Answer(true, { messages })
        );

    } catch(error) {
        return Promise.resolve(
            Answer(false, 'SYSTEM_ERROR', error)
        );
    }
}

module.exports = getHistory;