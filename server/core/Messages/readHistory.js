const DataBase = require('../DataBase/index');
const Answer = require('../Answer/index');

// const CacheRT = require('cache-rt');
const EventCache = require('../../EventCache/index');

/**
 * Mark history as read for peers users.
 *
 * @param {number} userId User id.
 * @param {number} peerId Peerd id.
 * 
 * @returns {Promise<{
 *  status: true
 *  data: {
 *   readCount: number 
 *  }
 * }>} Special `Answer` object.
 */

const readHistory = async (userId, peerId) => {
    try {

        peerId = peerId || '';
        peerId = String(peerId).trim();

        if (peerId === '') return Promise.resolve(
            Answer(false, 'SYSTEM_ERROR')
        );

        if (peerId.length > 11) return Promise.resolve(
            Answer(false, 'SYSTEM_ERROR')
        );

        if (peerId.search(/([^0-9])/ig) !== -1) return Promise.resolve(
            Answer(false, 'SYSTEM_ERROR')
        );

        peerId = Number(peerId);

        let db_readHistory = await DataBase.query(
            `
                UPDATE messages
                SET unread = 0
                WHERE (messages.senderId = ? AND messages.recipientId = ?) AND messages.deleted = 0
            `,
            [peerId, userId]
        );

        let readCount = db_readHistory.results.changedRows;

        if (readCount === 0) return Promise.resolve(
            Answer(false, 'SYSTEM_ERROR')
        );
        
        EventCache.push(peerId, 'message:read', { peerId: userId });

        return Promise.resolve(
            Answer(true, { readCount })
        );

    } catch(error) {
        return Promise.resolve(
            Answer(false, 'SYSTEM_ERROR', error)
        );
    }
}

module.exports = readHistory;