const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js')

module.exports = {
    help: {
        name: 'pat',
        aliases: ['pat'],
        description: 'Patto.',
        category:  __dirname.split("Commands\\")[1]
    },
    run: async(client, message, args) => {

        let victim = message.mentions.users.first() || (args.length > 0 ? message.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first() : message.author) || message.author;
        await fetch("https://nekos.life/api/v2/img/pat")
            .then(res => res.json())
            .then(body => {
                const embed = new MessageEmbed()
                    .setColor(config.embedcolor)
                    .setTitle("Here's your Pat, 👀")
                    .setDescription(`${message.author} pats ${victim}`)
                    .setImage(body.url)
                    .setTimestamp()
                    .setFooter(`© Karma `, "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png")

                message.channel.send({embeds: [embed]});
            });

    }
}