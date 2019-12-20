const sendMessage = require('./sendMessage');
const getHistory  = require('./getHistory');
const getDialogs  = require('./getDialogs');
const readHistory = require('./readHistory');

const Messages = {};

Messages.sendMessage = sendMessage;
Messages.getHistory  = getHistory;
Messages.getDialogs  = getDialogs;
Messages.readHistory = readHistory;

module.exports = Messages;