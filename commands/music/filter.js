const Discord = require("discord.js");
const { embedcolor } = require('../../configs/config.json')

module.exports = {
    config: {
        name: "filter",
        aliases: [],
        category: "music",
        description: "Add / Remove Filters",
        usage: "<filter>",
        accessableby: ""
    },
    run: async (client, message, args) => {
	const embednoinvoice = new Discord.MessageEmbed()
	.setTitle('Error!')
	.setDescription(`${client.emotes.error} - You're not in a voice channel !`)
	.setFooter('Karma Music System')
	.setColor(embedcolor)
	.setTimestamp();
	const embednomusic = new Discord.MessageEmbed()
	.setTitle('Error!')
	.setDescription(`${client.emotes.error} - No music currently playing !`)
	.setFooter('Karma Music System')
	.setColor(embedcolor)
	.setTimestamp();
	const embedspecify = new Discord.MessageEmbed()
	.setTitle('Error!')
	.setDescription(`${client.emotes.error} - Please specify a valid filter to enable or disable !`)
	.setFooter('Karma Music System')
	.setColor(embedcolor)
	.setTimestamp();
	const embednofilter = new Discord.MessageEmbed()
	.setTitle('Error!')
	.setDescription(`${client.emotes.error} - This filter doesn't exist !`)
	.setFooter('Karma Music System')
	.setColor(embedcolor)
	.setTimestamp();
	const embedfilteradd = new Discord.MessageEmbed()
	.setTitle('Filter Adding!')
	.setDescription(`${client.emotes.music} - I'm **adding** the filter to the music, please wait... Note : the longer the music is, the longer this will take.`)
	.setFooter('Karma Music System')
	.setColor(embedcolor)
	.setTimestamp();
    const embedfilderremove = new Discord.MessageEmbed()
	.setTitle('Filter Removing!')
	.setDescription(`${client.emotes.music} - I'm **disabling** the filter on the music, please wait... Note : the longer the music is playing, the longer this will take.`)
	.setFooter('Karma Music System')
	.setColor(embedcolor)
	.setTimestamp();
	if (!message.member.voice.channel) return message.channel.send(embednoinvoice);

    if (!client.player.getQueue(message)) return message.channel.send(embednomusic);

    if (!args[0]) return message.channel.send(embedspecify);

    const filterToUpdate = Object.values(client.filters).find((f) => f.toLowerCase() === args[0].toLowerCase());

    if (!filterToUpdate) return message.channel.send(embednofilter);

    const filterRealName = Object.keys(client.filters).find((f) => client.filters[f] === filterToUpdate);

    const queueFilters = client.player.getQueue(message).filters
    const filtersUpdated = {};
    filtersUpdated[filterRealName] = queueFilters[filterRealName] ? false : true;
    client.player.setFilters(message, filtersUpdated);

    if (filtersUpdated[filterRealName]) message.channel.send(embedfilteradd);
    else message.channel.send(embedfilderremove);

}
    };