const { MessageEmbed } = require('discord.js');

module.exports = {
    help: {
        name: 'iq',
        aliases: ['iq'],
        description: 'Test your iq :brain: ',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        try {
            const iq = Math.floor(Math.random() * 226);
            const embed = new MessageEmbed()
                .setTitle(":brain: IQ Test:")
                .setDescription(`:bulb:   ${user}'s  **IQ is:**   \`${iq}\`  `)
                .setColor("FF0000")
                .setThumbnail("https://media.giphy.com/media/l44QzsOLXxcrigdgI/giphy.gif")
                .setTimestamp()
                .setFooter('© Karma', 'https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png')
                .setColor(config.embedcolor);
            message.channel.send({embeds: [embed]});
        } catch (err) {
            message.channel.send({
                embed: {
                    color: `${config.embedcolor}`,
                    description: `${emotes.error} Something went wrong...`
                }
            })
        }
    }
}