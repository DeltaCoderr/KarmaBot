const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    help: {
        name: 'screenshot',
        aliases: ['ss', 'screenshot'],
        description: 'Shows the Web Screenshots',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {

            const body = await fetch(`https://shot.screenshotapi.net/screenshot?&url=${encodeURIComponent(args.join(" "))}&fresh=true&output=json&file_type=png&wait_for_event=load`)
           .then(res => res.json().catch(() => { }));

            if (!body) return message.channel.send({
                embed: {
                    color: config.embedcolor,
                    title: "❌ Error Page Not Found."
                }
            })
            if (body.error) return message.channel.send({
                embed: {
                    color: config.embedcolor,
                    title: "❌ Error Page Not Found."
                }
            });

            const embed = new MessageEmbed()
                .setTitle(`🌐 ${body.url} `)
                .setColor(config.embedcolor)
                .setTimestamp()
                .setFooter(`© Karma `, "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png")
                .setThumbnail(`${body.screenshot}`)
            message.channel.send(embed);
        }
    }
