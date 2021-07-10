
const { Bot } = require('../Structures/Client');

/**
 * @param { Bot } client
 **/

module.exports = (client) => {
    
    logger.success(`[API]: Logged in as ${client.user.username}`);
}