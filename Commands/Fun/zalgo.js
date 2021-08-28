const { MessageEmbed } = require('discord.js');
const Zalgo = require('to-zalgo');

module.exports = {
    help: {
        name: 'zalgo',
        aliases: ['zalgo'],
        description: 'Converts your text into Zalgo ',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setColor(config.embedcolor)
            .setDescription(`${Zalgo(args.join(" "))}`)
            .setTimestamp()
            .setFooter('© Karma ', 'https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png')
        message.channel.send({embeds: [embed]})
    }
}