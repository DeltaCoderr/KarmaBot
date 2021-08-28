const { MessageEmbed } = require('node-fetch');
const fetch = require('node-fetch');

module.exports = {
    help: {
        name: 'karma',
        aliases: ['karma'],
        description: 'Drops random Karma Pictures.',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {

        let res = await fetch('https://api.deltaa.me/karma')
        let data = await res.json()

        let gifembed = new MessageEmbed()
            .setTitle(`Random Karma ${data.url.endsWith('.png') ? 'Picture' : `${data.url.endsWith('.gif') ? 'GIF' : 'Picture'}`}`)
            .setColor(config.embedcolor)
            .setDescription(`[Full View](${data.url})`)
            .setFooter(`© Karma`, message.author.avatarURL())
            .setImage(data.url);
        message.channel.send({ embeds: [gifembed]});
    }
}
