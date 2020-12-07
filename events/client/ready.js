const { PREFIX } = require('../../configs/config.json');
const moment = require('moment');
const chalk = require("chalk")

module.exports = async client => {
    let totalUsers = client.guilds.cache.reduce((users , value) => users + value.memberCount, 0);
    let totalGuilds = client.guilds.cache.size
    let totalChannels = client.channels.cache.size

    console.log(chalk.red`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Active, Commands Loaded!`);
    console.log(chalk.red`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} Logged In!`);
    client.user.setPresence({ activity: { name: "Anime", type: "WATCHING" }, status: "idle" });
    console.log(chalk.blue`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Now ` + totalChannels + ` channels, ` + totalGuilds + ` Servers and ` + totalUsers + ` serving  users!`);
}