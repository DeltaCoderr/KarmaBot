const { Bot } = require('../Structures/Client');
/**
 * @param { Bot } client
 */

module.exports = (client) => {
    console.log(`[API] : Logged in as ${client.user.username}`);
}