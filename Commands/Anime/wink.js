const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    help: {
        name: 'wink',
        aliases: ['wink'],
        description: 'Winky Wink.',
        category:  __dirname.split("Commands\\")[1]
    },
    run: async(client, message, args) => {
        fetch('https://some-random-api.ml/animu/wink')
        .then(res => res.json())
        .then(response => {
                const embed = new MessageEmbed()
                    .setTitle("Here's your Wink 😉")
                    .setImage(response.link)
                    .setColor(config.embedcolor)
                    .setTimestamp()
                    .setFooter(`© Karma `, "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png")
                    .setURL(response.url);
                message.channel.send({embeds: [embed]});
            });
    }
}