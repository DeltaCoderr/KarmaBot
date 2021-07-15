
const { Bot } = require('../Structures/Client');

/**
 * @param { Bot } client
 **/

module.exports = (client) => {
    
    logger.success(`[API]: Logged in as ${client.user.username}`);
    logger.info(`[STATS]: Users -> ${client.guilds.cache.reduce((users, value) => users + value.memberCount, 0)}`);
    logger.info(`[STATS]: Guilds -> ${client.guilds.cache.size}`);
}
