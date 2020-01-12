const DataBase = require('../DataBase/index');
const Answer   = require('../Answer/index');
const Users    = require('../Users/index');

const CacheRT  = require('cache-rt');

/**
 * Send message from `sender` to `recipient` user.
 * 
 * id: messageId, senderId, recipientId, peerId: recipientId, peerFullName: recipientFullName, date, text, unread: 1
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
 * }} Message
 *
 * @param {number} senderId Id user sender.
 * @param {number} recipientId Id user recipient.
 * @param {string} text Text message.
 * 
 * @returns {Promise<{
 *  status: boolean
 *  data: Array<Message>
 * }>} Special `Answer` object.
 */

const sendMessage = async (senderId, recipientId, text) => {
    try {

        senderId = senderId || '';
        senderId = String(senderId).trim();

        recipientId = recipientId || '';
        recipientId = String(recipientId).trim();

        text = text || '';
        text = String(text).trim();

        /// check senderId: number ///

        // if(!/[0-9]{1,11}/.test( senderId )) return Promise.resolve(
        //     Answer(false, 'SYSTEM_ERROR')
        // );

        if (senderId === '') return Promise.resolve(
            Answer(false, 'SYSTEM_ERROR')
        );

        if (senderId.length > 11) return Promise.resolve(
            Answer(false, 'SYSTEM_ERROR')
        );

        if (senderId.search(/([^0-9])/ig) !== -1) return Promise.resolve(
            Answer(false, 'SYSTEM_ERROR')
        );

        /// check recipientId: number ///

        // if(!/[0-9]{1,11}/.test( recipientId )) return Promise.resolve(
        //     Answer(false, 'SYSTEM_ERROR')
        // );

        if (recipientId === '') return Promise.resolve(
            Answer(false, 'RECIPIENT_NULL')
        );

        if (recipientId.length > 11) return Promise.resolve(
            Answer(false, 'RECIPIENT_LONG')
        );

        if (recipientId.search(/([^0-9])/ig) !== -1) return Promise.resolve(
            Answer(false, 'RECIPIENT_INVALID')
        ); 
        

        /// check text: string ///

        if (text === '') return Promise.resolve(
            Answer(false, 'MESSAGE_TEXT_NULL')
        );

        if (text.length > 10000) return Promise.resolve(
            Answer(false, 'MESSAGE_TEXT_LONG')
        );

        /* required type */

        senderId = Number(senderId);
        recipientId = Number(recipientId);

        /* detect and sort full name */

        let cr_getUsers,
            senderFullName = '',
            recipientFullName = '';

        if (senderId === recipientId) {

            cr_getUsers = await Users.getUsers([ senderId ]);

            if (Object.keys(cr_getUsers.data.users).length !== 1) return Promise.resolve(
                Answer(false, 'USER_NOT_FOUND')
            );

            senderFullName = recipientFullName = cr_getUsers.data.users[ senderId ].fullName;

        } else {
            cr_getUsers = await Users.getUsers([ senderId, recipientId ]);

            if (Object.keys(cr_getUsers.data.users).length !== 2) return Promise.resolve(
                Answer(false, 'USER_NOT_FOUND')
            );

            senderFullName = cr_getUsers.data.users[ senderId ].fullName;
            recipientFullName = cr_getUsers.data.users[ recipientId ].fullName;
            
        }



        let date = +new Date();

        let db_sendMessage = await DataBase.query(
            `
                INSERT INTO messages (
                    senderId, recipientId, date, text
                )
                VALUES (
                    ?, ?, ?, ?
                )
            `,
            [senderId, recipientId, date, text],
            true
        );

        let messageId = db_sendMessage.results.insertId;

        //if (senderId !== recipientId)
        //    CacheRT.push(senderId, 'message', {id: messageId, senderId, recipientId, peerId: recipientId, peerFullName: recipientFullName, date, text, unread: 1});

        CacheRT.push(recipientId, 'message', { id: messageId, senderId, recipientId, peerId: senderId, peerFullName: senderFullName, date, text, unread: 1 });

        return Promise.resolve(
            Answer(true, {id: messageId, senderId, recipientId, peerId: recipientId, peerFullName: recipientFullName, date, text, unread: 1})
        );

    } catch(error) {
        console.log(error);
        return Promise.resolve(
            Answer(false, 'SYSTEM_ERROR', error)
        );
    }

}

module.exports = sendMessage;