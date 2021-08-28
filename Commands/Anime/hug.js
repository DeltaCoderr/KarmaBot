const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const { resolveMember } = require('../../Base/Functions')

module.exports = {
    help: {
        name: 'hug',
        aliases: ['hug'],
        description: 'Get a gif for Hugging someone :eyes:.',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {

        let victim = message.mentions.users.first() || (args.length > 0 ? message.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first() : message.author) || message.author;
        await fetch("https://nekos.life/api/v2/img/hug")
            .then(res => res.json())
            .then(body => {
                const embed = new MessageEmbed()
                    .setColor(config.embedcolor)
                    .setTitle("Here's your hug, 🤗")
                    .setDescription(`${victim} is hugged by ${message.author}`)
                    .setImage(body.url)
                    .setTimestamp()
                    .setFooter(`© Karma `, "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png")

                message.channel.send({ embeds: [embed]});
            });
    },
};