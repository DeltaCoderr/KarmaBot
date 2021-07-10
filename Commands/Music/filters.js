const Discord = require('discord.js');
const { embedcolor } = require('../../Configs/config');

module.exports = {
    help: {
        name: 'filters',
        aliases: ['filters'],
        description: 'Shows all the filters.',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {
        const embednoinvoice = new Discord.MessageEmbed()
            .setTitle('Error!')
            .setDescription(`${emotes.error} - You're not in a voice channel !`)
            .setFooter('Karma Music System')
            .setColor(embedcolor)
            .setTimestamp();
        const embednosong = new Discord.MessageEmbed()
            .setTitle('Error!')
            .setDescription(`${emotes.error} - No songs currently playing !`)
            .setFooter('Karma Music System')
            .setColor(embedcolor)
            .setTimestamp();
        if (!message.member.voice.channel) return message.channel.send(embednoinvoice);

        if (!client.player.getQueue(message)) return message.channel.send(embednosong);

        const disabledEmoji = emotes.error;
        const enabledEmoji = emotes.success;

        const filtersStatuses = [[], []];

        Object.keys(filters).forEach((filterName) => {
            const array = filtersStatuses[0].length > filtersStatuses[1].length ? filtersStatuses[1] : filtersStatuses[0];
            array.push(filters[filterName] + " : " + (client.player.getQueue(message).filters[filterName] ? enabledEmoji : disabledEmoji));
        });

        message.channel.send({
            embed: {
                footer: { text: 'Karma Music System' },
                fields: [
                    { name: 'Filters', value: filtersStatuses[0].join('\n'), inline: true },
                    { name: '** **', value: filtersStatuses[1].join('\n'), inline: true },
                ],
                timestamp: new Date(),
                color: embedcolor,
                description: `List of all filters enabled or disabled.\nUse \`${config.prefix}filter\` to add a filter to a song.`,
            },
        });
    }
}