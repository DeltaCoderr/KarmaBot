const { Bot } = require('../Structures/Client');
/**
 * @param { Bot } client
 */

module.exports = {
    name: 'ready',
    once: true,
    async execute(interaction, client) {
        console.log(`[API] : Logged in as ${client.user.username}`);
    }
}